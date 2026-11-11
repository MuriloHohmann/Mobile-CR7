import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://10.154.20.150:5000/movimentacoes';

export default function Movimentacoes() {
  const router = useRouter();
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    buscarMovimentacoes();
  }, []);

  const buscarMovimentacoes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovimentacoes(data);
    } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isEntrada = item.tipo === 'entrada';
    
    return (
      <View style={styles.linhaTabela}>
        <View style={{ flex: 2 }}>
          <Text style={styles.nomeProduto}>{item.produto_nome}</Text>
          <Text style={styles.infoText}>Por: {item.usuario_email}</Text>
          <Text style={styles.dataText}>{item.data}</Text>
        </View>

        {/* Badge indicando se foi Entrada ou Saída */}
        <View style={[styles.badgeTipo, { backgroundColor: isEntrada ? '#dcfce7' : '#fee2e2' }]}>
          <Text style={[styles.textoTipo, { color: isEntrada ? '#16a34a' : '#dc2626' }]}>
            {isEntrada ? 'Entrada' : 'Saída'}
          </Text>
        </View>

        <View style={styles.containerQtd}>
          <Text style={[styles.valorQtd, { color: isEntrada ? '#16a34a' : '#dc2626' }]}>
            {isEntrada ? `+${item.quantidade}` : `-${item.quantidade}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Navbar Superior */}
      <View style={styles.navbar}>
        <Text style={styles.navTitulo}>Movimentações</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.navVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Cabeçalho da Lista */}
      <View style={styles.cabecalhoTabela}>
        <Text style={[styles.textoCabecalho, { flex: 2 }]}>Detalhes</Text>
        <Text style={[styles.textoCabecalho, { flex: 1, textAlign: 'center' }]}>Tipo</Text>
        <Text style={[styles.textoCabecalho, { flex: 1, textAlign: 'right' }]}>Qtd</Text>
      </View>

      {/* Lista de Movimentações */}
      <FlatList
        data={movimentacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma movimentação registada.</Text>}
        ListFooterComponent={
          <Image 
            source={require('../assets/industria.png')} 
            style={styles.fotoINDUSTRIA}
          />
        }
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
    backgroundColor: '#192a6b',
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
  nomeProduto: { fontSize: 15, fontWeight: '500', color: '#0f172a' },
  infoText: { fontSize: 12, color: '#475569', marginTop: 1 },
  dataText: { fontSize: 10, color: '#94a3b8', marginTop: 1 },
  badgeTipo: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  textoTipo: { fontSize: 11, fontWeight: 'bold' },
  containerQtd: {
    flex: 1,
    alignItems: 'flex-end',
  },
  valorQtd: { fontSize: 15, fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 30, color: '#64748b' },
  // Estilo limpo apenas para a imagem cobrir tudo perfeitamente
  fotoINDUSTRIA: {
    width: '100%',
    height: 420, // Você pode aumentar ou diminuir essa altura se preferir
    resizeMode: 'cover',
    marginTop: 10,
  },
});