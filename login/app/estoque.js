import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, 
  FlatList, StyleSheet, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

// Lembre-se de trocar pelo IP correto da sua máquina
const API_URL = 'http://10.154.20.215:5000/produtos';

export default function EstoqueComum() {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);

  // Carrega os produtos ao abrir a tela
  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para retirar quantidade do produto
  const retirarProduto = async (id, quantidadeAtual) => {
    if (quantidadeAtual <= 0) {
      Alert.alert("Atenção", "Este produto já está esgotado.");
      return;
    }

    const novaQtd = quantidadeAtual - 1;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: novaQtd }),
      });

      if (response.ok) {
        buscarProdutos();
      } else {
        Alert.alert("Erro", "Não foi possível registrar a retirada.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.linhaTabela}>
      {/* Informações do Produto (Nome e Descrição) */}
      <View style={{ flex: 2 }}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        {item.descricao ? <Text style={styles.descricaoText}>{item.descricao}</Text> : null}
        {item.categoria ? <Text style={styles.categoria}>{item.categoria}</Text> : null}
      </View>

      {/* Quantidade Atual */}
      <View style={styles.containerQtd}>
        <Text style={styles.valorQtd}>{item.quantidade}</Text>
        <Text style={styles.labelQtd}>disp.</Text>
      </View>

      {/* Botão de Retirar */}
      <TouchableOpacity 
        style={styles.btnRetirar} 
        onPress={() => retirarProduto(item.id, item.quantidade)}
      >
        <Text style={styles.textoRetirar}>Retirar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar Superior (Mesmo padrão) */}
      <View style={styles.navbar}>
        <Text style={styles.navTitulo}>Almoxarifado</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.navVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Cabeçalho da Lista */}
      <View style={styles.cabecalhoTabela}>
        <Text style={[styles.textoCabecalho, { flex: 2 }]}>Produto / Descrição</Text>
        <Text style={[styles.textoCabecalho, { flex: 1, textAlign: 'center' }]}>Qtd</Text>
        <Text style={[styles.textoCabecalho, { width: 80, textAlign: 'center' }]}>Ação</Text>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto disponível no momento.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  navTitulo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  navVoltar: { color: '#94a3b8', fontSize: 16 },
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
  categoria: { fontSize: 11, color: '#94a3b8', marginTop: 1 },
  containerQtd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valorQtd: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  labelQtd: { fontSize: 10, color: '#64748b' },
  btnRetirar: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: 80,
    alignItems: 'center',
  },
  textoRetirar: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  vazio: { textAlign: 'center', marginTop: 30, color: '#64748b' },
});