from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import os

app = Flask(__name__)
CORS(app)

# Configuração de conexão pegando do Docker Compose
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_USER = os.environ.get('DB_USER', 'root')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'rootpassword')
DB_NAME = os.environ.get('DB_NAME', 'meu_banco')

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
    return "API Flask do Almoxarifado rodando!"

@app.route('/api/status', methods=['GET'])
def status():
    try:
        connection = get_db_connection()
        connection.close()
        return jsonify({"status": "sucesso", "mensagem": "Conectado ao MySQL com sucesso!"})
    except Exception as e:
        return jsonify({"status": "erro", "detalhes": str(e)}), 500

# --- NOVAS ROTAS PARA O TEU APP MOBILE ---

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
            # Substitui 'usuarios' pelo nome real da tua tabela na base de dados
            sql = "SELECT * FROM usuarios WHERE email = %s AND senha = %s"
            cursor.execute(sql, (email, senha))
            usuario = cursor.fetchone()
        connection.close()

        if usuario:
            return jsonify({"status": "sucesso", "mensagem": "Login efetuado com sucesso!", "usuario": usuario}), 200
        else:
            return jsonify({"status": "erro", "mensagem": "E-mail ou senha incorretos!"}), 401
            
    except Exception as e:
        return jsonify({"status": "erro", "detalhes": str(e)}), 500


# Rota para Registar / Cadastrar Utilizador
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"mensagem": "Preencha todos os campos!"}), 400

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Insere o novo utilizador na base de dados
            sql = "INSERT INTO usuarios (email, senha) VALUES (%s, %s)"
            cursor.execute(sql, (email, senha))
            connection.commit()
        connection.close()

        return jsonify({"status": "sucesso", "mensagem": "Utilizador registado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"status": "erro", "detalhes": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)