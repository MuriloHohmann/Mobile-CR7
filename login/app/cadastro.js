import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleCadastrar = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos para se cadastrar.');
      return;
    }

    try {
      // Endpoint /cadastro configurado no Flask do seu colega
      const response = await fetch('http://10.154.20.50:5000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha,
          tipo: 'comum' // Tipo padrão para novos cadastros
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => router.back() } // Volta para a tela de login
        ]);
      } else {
        Alert.alert('Erro', data.mensagem || 'Não foi possível realizar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível ligar ao servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.btnSalvar} onPress={handleCadastrar}>
        <Text style={styles.btnText}>Salvar Cadastro</Text>
      </TouchableOpacity>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.btnVoltar}>
          <Text style={styles.btnText}>Voltar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005ea7',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 14,
    fontSize: 18,
  },
  btnSalvar: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  btnVoltar: {
    backgroundColor: '#1b1464',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});