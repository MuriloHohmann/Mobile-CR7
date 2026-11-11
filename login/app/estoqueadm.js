import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, StyleSheet, Alert, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.154.20.188:5000/produtos';

export default function EstoqueAdm() {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState(''); // Estado para categoria (ex: Ferramentas / Equipamentos)
  const [quantidade, setQuantidade] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    carregarDadosUsuario();
    buscarProdutos();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioSalvo) {
        const parsed = JSON.parse(usuarioSalvo);
        setUsuarioId(parsed.id);
      }
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }
  };

  const buscarProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const adicionarProduto = async () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Digite o nome do produto.");
      return;
    }

    if (!usuarioId) {
      Alert.alert("Erro", "ID do administrador não identificado. Faça login novamente.");
      return;
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao,
          categoria: categoria.trim() ? categoria.trim() : 'Geral',
          quantidade: parseInt(quantidade) || 0,
          usuario_id: usuarioId, // Envia o ID do ADM para registar a movimentação de entrada
        }),
      });
      setNome('');
      setDescricao('');
      setCategoria('');
      setQuantidade('');
      buscarProdutos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o produto.");
    }
  };

  const alterarQuantidade = async (id, quantidadeAtual, delta) => {
    const novaQtd = quantidadeAtual + delta;
    if (novaQtd < 0) return;

    if (!usuarioId) {
      Alert.alert("Erro", "ID do administrador não identificado.");
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          quantidade: novaQtd,
          usuario_id: usuarioId 
        }),
      });
      buscarProdutos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a quantidade.");
    }
  };

  const removerProduto = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      buscarProdutos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o produto.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.linhaTabela}>
      <View style={{ flex: 2 }}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        {item.descricao ? <Text style={styles.descricaoText}>{item.descricao}</Text> : null}
        {item.categoria ? <Text style={styles.categoriaText}>Cat: {item.categoria}</Text> : null}
      </View>

      <View style={styles.controleQtd}>
        <TouchableOpacity 
          style={styles.btnQtd} 
          onPress={() => alterarQuantidade(item.id, item.quantidade, -1)}
        >
          <Text style={styles.textoBtnQtd}>-</Text>
        </TouchableOpacity>

        <Text style={styles.valorQtd}>{item.quantidade}</Text>

        <TouchableOpacity 
          style={styles.btnQtd} 
          onPress={() => alterarQuantidade(item.id, item.quantidade, 1)}
        >
          <Text style={styles.textoBtnQtd}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.btnExcluir} 
        onPress={() => removerProduto(item.id)}
      >
        <Text style={styles.textoExcluir}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar Superior */}
      <View style={styles.navbar}>
        <Text style={styles.navTitulo}>Estoque ADM</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.navVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário para Adicionar com Categoria */}
      <View style={styles.form}>
        <View style={styles.linhaInputs}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Qtd"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
        </View>

        <View style={styles.linhaInputs}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Categoria (ex: Ferramentas / Equipamentos)"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>
        
        <View style={styles.linhaInputs}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Descrição do produto"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TouchableOpacity style={styles.btnAdicionar} onPress={adicionarProduto}>
            <Text style={styles.textoAdicionar}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cabeçalho da Tabela */}
      <View style={styles.cabecalhoTabela}>
        <Text style={[styles.textoCabecalho, { flex: 2 }]}>Produto</Text>
        <Text style={[styles.textoCabecalho, { flex: 1, textAlign: 'center' }]}>Qtd</Text>
        <Text style={[styles.textoCabecalho, { width: 40, textAlign: 'center' }]}>Ação</Text>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#005ea7' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#192a6b',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  navTitulo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  navVoltar: { color: '#94a3b8', fontSize: 16 },
  form: {
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  linhaInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#f8fafc',
    fontSize: 14,
  },
  btnAdicionar: {
    backgroundColor: '#16a34a',
    width: 45,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoAdicionar: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  cabecalhoTabela: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoCabecalho: { fontWeight: 'bold', color: '#334155', fontSize: 14 },
  linhaTabela: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  nomeProduto: { fontSize: 16, fontWeight: '500', color: '#0f172a' },
  descricaoText: { fontSize: 12, color: '#475569', marginTop: 2 },
  categoriaText: { fontSize: 11, color: '#2563eb', fontWeight: '500', marginTop: 1 },
  controleQtd: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnQtd: {
    backgroundColor: '#e2e8f0',
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBtnQtd: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  valorQtd: { fontSize: 16, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
  btnExcluir: {
    backgroundColor: '#ef4444',
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  textoExcluir: { color: '#fff', fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 30, color: '#64748b' },
});