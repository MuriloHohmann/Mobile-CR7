from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import os

app = Flask(__name__)
CORS(app)

# Configuração de conexão com o banco de dados
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_USER = os.environ.get('DB_USER', 'root')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'suasenha123') # Senha vazia para coincidir com o container do Docker
DB_NAME = os.environ.get('DB_NAME', 'CR7GOAT')

def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/')
def home():
    return "API Flask do TCC rodando!"

@app.route('/api/status', methods=['GET'])
def status():
    try:
        connection = get_db_connection()
        connection.close()
        return jsonify({"status": "sucesso", "mensagem": "Conectado ao MySQL com sucesso!"})
    except Exception as e:
        print("ERRO DE STATUS:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500

# Rota para fazer Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"mensagem": "Email e senha são obrigatórios!"}), 400

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM usuario WHERE email = %s AND senha = %s"
            cursor.execute(sql, (email, senha))
            usuario = cursor.fetchone()
        connection.close()

        if usuario:
            return jsonify({"status": "sucesso", "mensagem": "Login efetuado com sucesso!", "usuario": usuario}), 200
        else:
            return jsonify({"status": "erro", "mensagem": "E-mail ou senha incorretos!"}), 401
            
    except Exception as e:
        print("ERRO NO LOGIN:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500

# Rota para Registar / Cadastrar Utilizador
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')
    tipo = data.get('tipo', 'comum')

    if not email or not senha:
        return jsonify({"mensagem": "Preencha todos os campos!"}), 400

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO usuario (email, senha, tipo) VALUES (%s, %s, %s)"
            cursor.execute(sql, (email, senha, tipo))
            connection.commit()
        connection.close()

        return jsonify({"status": "sucesso", "mensagem": "Utilizador registado com sucesso!"}), 201

    except Exception as e:
        print("ERRO NO CADASTRO:", str(e)) # Vai mostrar o erro real no terminal do VS Code
        return jsonify({"status": "erro", "detalhes": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)