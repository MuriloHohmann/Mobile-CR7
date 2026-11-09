import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function EstoqueAdm() {
  const router = useRouter();

  // Exemplo de itens para visualização ADM
  const itensEstoque = [
    { id: '1', nome: 'Chave de Fenda', quantidade: 18 },
    { id: '2', nome: 'Multímetro', quantidade: 5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel de Gestão (ADM)</Text>

      <TouchableOpacity style={styles.btnAdicionar}>
        <Text style={styles.btnExt}>+ Adicionar Novo Item</Text>
      </TouchableOpacity>

      <FlatList
        data={itensEstoque}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemQtd}>Qtd: {item.quantidade}</Text>
            </View>
            <View style={styles.acoesContainer}>
              <TouchableOpacity style={styles.btnEditar}>
                <Text style={styles.btnTextAcao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnExcluir}>
                <Text style={styles.btnTextAcao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.replace('/')}>
        <Text style={styles.btnText}>Sair / Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005ea7',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  btnAdicionar: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnExt: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemQtd: {
    fontSize: 14,
    color: '#666',
  },
  acoesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  btnEditar: {
    backgroundColor: '#ff9900',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnExcluir: {
    backgroundColor: '#cc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnVoltar: {
    backgroundColor: '#1b1464',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnTextAcao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});