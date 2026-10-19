import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  // E-mail e senha salvos no código para teste
  const EMAIL_CORRETO = 'murilorohohmann@gmail.com';
  const SENHA_CORRETA = 'hohmann';

  const handleLogin = () => {
    // Valida se os campos estão vazios
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    // Valida se o email e a senha batem com os salvos
    if (email.trim() === EMAIL_CORRETO && senha === SENHA_CORRETA) {
      // Se estiver correto, vai para a página de teste/sucesso
      router.push('/teste');
    } else {
      // Se estiver incorreto, mostra a notificação de informações inválidas
      Alert.alert('Erro', 'Informações inválidas! E-mail ou senha incorretos.');
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

        {/* Botão de login agora aciona a função handleLogin */}
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
    width: 1100,
    maxWidth: 300,
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
    maxWidth: 300,
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