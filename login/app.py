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
            tipo_usuario = usuario.get('tipo', 'comum')

            return jsonify({
                "status": "sucesso", 
                "mensagem": "Login efetuado com sucesso!", 
                "tipo": tipo_usuario, 
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


# ==========================================
# ROTAS DE PRODUTOS (ALMOXARIFADO)
# ==========================================

# 1. Listar todos os produtos
@app.route('/produtos', methods=['GET'])
def listar_produtos():
    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, nome, descricao, quantidade, categoria FROM produto ORDER BY id DESC")
            produtos = cursor.fetchall()
        return jsonify(produtos), 200
    except Exception as e:
        print("ERRO AO LISTAR PRODUTOS:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()

# 2. Adicionar novo produto (com registo de movimentação inicial se aplicável)
@app.route('/produtos', methods=['POST'])
def adicionar_produto():
    dados = request.get_json()
    if not dados:
        return jsonify({"mensagem": "Requisição inválida ou sem JSON!"}), 400

    nome = dados.get('nome')
    quantidade = int(dados.get('quantidade', 0))
    categoria = dados.get('categoria', '')
    descricao = dados.get('descricao', '')
    usuario_id = dados.get('usuario_id')

    if not nome:
        return jsonify({"mensagem": "O nome do produto é obrigatório!"}), 400

    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql_produto = "INSERT INTO produto (nome, descricao, quantidade, categoria) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql_produto, (nome, descricao, quantidade, categoria))
            produto_id = cursor.lastrowid

            if quantidade > 0 and usuario_id:
                sql_mov = "INSERT INTO movimentacao (produto_id, usuario_id, tipo, quantidade) VALUES (%s, %s, 'entrada', %s)"
                cursor.execute(sql_mov, (produto_id, usuario_id, quantidade))

            connection.commit()
        return jsonify({"status": "sucesso", "mensagem": "Produto adicionado com sucesso!"}), 201
    except Exception as e:
        print("ERRO AO ADICIONAR PRODUTO:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()

# 3. Atualizar quantidade e registar movimentação automaticamente (Entrada ou Saída)
@app.route('/produtos/<int:id>', methods=['PUT'])
def atualizar_quantidade(id):
    dados = request.get_json()
    if not dados:
        return jsonify({"mensagem": "Requisição inválida ou sem JSON!"}), 400

    nova_quantidade = dados.get('quantidade')
    usuario_id = dados.get('usuario_id')

    if nova_quantidade is None:
        return jsonify({"mensagem": "A quantidade é obrigatória!"}), 400

    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT quantidade FROM produto WHERE id = %s", (id,))
            produto_atual = cursor.fetchone()
            
            if not produto_atual:
                return jsonify({"mensagem": "Produto não encontrado!"}), 404

            qtd_antiga = produto_atual['quantidade']
            diferenca = nova_quantidade - qtd_antiga

            if diferenca != 0 and usuario_id:
                tipo_mov = 'entrada' if diferenca > 0 else 'saida'
                qtd_mov = abs(diferenca)

                sql_mov = "INSERT INTO movimentacao (produto_id, usuario_id, tipo, quantidade) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql_mov, (id, usuario_id, tipo_mov, qtd_mov))

            cursor.execute("UPDATE produto SET quantidade = %s WHERE id = %s", (nova_quantidade, id))
            connection.commit()

        return jsonify({"status": "sucesso", "mensagem": "Quantidade atualizada e movimentação registada!"}), 200
    except Exception as e:
        print("ERRO AO ATUALIZAR QUANTIDADE:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()

# 4. Remover produto
@app.route('/produtos/<int:id>', methods=['DELETE'])
def deletar_produto(id):
    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM produto WHERE id = %s", (id,))
            connection.commit()
        return jsonify({"status": "sucesso", "mensagem": "Produto removido!"}), 200
    except Exception as e:
        print("ERRO AO REMOVER PRODUTO:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()


# ==========================================
# ROTAS DE MOVIMENTAÇÕES
# ==========================================

@app.route('/movimentacoes', methods=['GET'])
def listar_movimentacoes():
    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                SELECT m.id, p.nome AS produto_nome, u.email AS usuario_email, 
                       m.tipo, m.quantidade, 
                       DATE_FORMAT(m.data_movimentacao, '%d/%m/%Y %H:%i') AS data
                FROM movimentacao m
                JOIN produto p ON m.produto_id = p.id
                JOIN usuario u ON m.usuario_id = u.id
                ORDER BY m.id DESC
            """
            cursor.execute(sql)
            movimentacoes = cursor.fetchall()
        return jsonify(movimentacoes), 200
    except Exception as e:
        print("ERRO AO LISTAR MOVIMENTACOES:", str(e))
        return jsonify({"status": "erro", "detalhes": str(e)}), 500
    finally:
        if connection:
            connection.close()


if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=5000, debug=True)