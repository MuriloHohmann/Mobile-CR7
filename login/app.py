from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import os

app = Flask(__name__)
CORS(app)

# Configuração de conexão com o banco de dados via variáveis de ambiente
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_USER = os.environ.get('DB_USER', 'root')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'rootpassword')
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
    connection = None
    try:
        connection = get_db_connection()
        return jsonify({"status": "sucesso", "mensagem": "Conectado ao MySQL com sucesso!"})
    except Exception as e:
        print("ERRO DE STATUS:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()

# Rota para fazer Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"mensagem": "Requisição inválida ou sem JSON!"}), 400
        
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"mensagem": "Email e senha são obrigatórios!"}), 400

    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM usuario WHERE email = %s AND senha = %s"
            cursor.execute(sql, (email, senha))
            usuario = cursor.fetchone()

        if usuario:
            # Obtém o tipo do usuário do banco de dados (padrão 'comum' se não existir)
            tipo_usuario = usuario.get('tipo', 'comum')

            return jsonify({
                "status": "sucesso", 
                "mensagem": "Login efetuado com sucesso!", 
                "tipo": tipo_usuario, # Informa explicitamente se é admin ou comum
                "usuario": usuario
            }), 200
        else:
            return jsonify({"status": "erro", "mensagem": "E-mail ou senha incorretos!"}), 401
            
    except Exception as e:
        print("ERRO NO LOGIN:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()

# Rota para Registar / Cadastrar Utilizador
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    if not data:
        return jsonify({"mensagem": "Requisição inválida ou sem JSON!"}), 400

    email = data.get('email')
    senha = data.get('senha')
    tipo = data.get('tipo', 'comum')

    if not email or not senha:
        return jsonify({"mensagem": "Preencha todos os campos!"}), 400

    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO usuario (email, senha, tipo) VALUES (%s, %s, %s)"
            cursor.execute(sql, (email, senha, tipo))
            connection.commit()

        return jsonify({"status": "sucesso", "mensagem": "Utilizador registado com sucesso!"}), 201

    except Exception as e:
        print("ERRO NO CADASTRO:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()

if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=5000, debug=True)