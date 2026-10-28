import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      // Substitua pelo IP atual do PC do seu colega na rede
      const response = await fetch('http://192.168.56.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', data.mensagem || 'Login efetuado com sucesso!');
        router.push('/teste');
      } else {
        Alert.alert('Erro', data.mensagem || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível ligar ao servidor. Verifique se o Docker está a correr.');
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image style={styles.fotofoda} source={require('../assets/boludos.png')} />
      
      <Text style={styles.paragraph}>
        Seja bem vindo!
      </Text>

      <Image style={styles.senai} source={require('../assets/Senai.jpg')} />
      
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
      
      <View style={styles.buttonContainer}>
        <Link href="/cadastro" asChild>
          <TouchableOpacity style={styles.btnCadastrar}>
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
        </Link>  

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.brother} pointerEvents="none">
        Faça o login, meu brother!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#005ea7',
    padding: 8,
  },
  paragraph: {
    marginTop: -18,
    fontSize: 18,
    fontWeight: 'bold',
    left: 116,
    color: 'white',
  },
  fotofoda: {
    left: -8,
    width: 400,
    height: 350,
    top: -30,
  },
  brother: {
    position: 'absolute', 
    bottom: 20,                     
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  senai: {
    left: 75,
    width: 200,
    height: 100,
    top: 30,
  },
  input: {
    position: 'relative',
    width: 300,
    height: 40,
    top: 40,
    left: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 14,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    left: 50,
    top: 40,
    marginBottom: 30,
    position: 'relative',
    zIndex: 10,
  },
  btnCadastrar: {
    backgroundColor: '#ff9900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#1b1464',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});