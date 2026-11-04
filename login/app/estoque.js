import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function Estoque() {
  const router = useRouter();

  // Exemplo de itens do estoque (posteriormente buscar via fetch do Flask)
  const itensEstoque = [
    { id: '1', nome: 'Chave de Fenda', quantidade: 10 },
    { id: '2', nome: 'Multímetro', quantidade: 5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estoque (Usuário Comum)</Text>

      <FlatList
        data={itensEstoque}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemQtd}>Quantidade disponível: {item.quantidade}</Text>
            </View>
            <TouchableOpacity style={styles.btnRetirar}>
              <Text style={styles.btnTextText}>Retirar</Text>
            </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: 'center',
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
  itemNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemQtd: {
    fontSize: 14,
    color: '#666',
  },
  btnRetirar: {
    backgroundColor: '#ff9900',
    paddingVertical: 8,
    paddingHorizontal: 15,
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
  btnTextText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  }
});