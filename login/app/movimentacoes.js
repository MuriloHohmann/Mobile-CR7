import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Movimentacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Registo de Movimentações (Entradas e Saídas)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});