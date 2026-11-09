import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CadastroAdm() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Painel de Cadastro de Administrador</Text>
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