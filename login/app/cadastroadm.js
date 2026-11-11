import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://10.154.20.150:5000/cadastro';

export default function CadastroAdm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('comum'); // 'comum' (ou usuario) ou 'admin'

  const cadastrarUsuario = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha,
          tipo: tipo
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "User regitrado com sucesso my g!!!");
        setEmail('');
        setSenha('');
        setTipo('comum');
      } else {
        Alert.alert("Erro", data.mensagem || "Não foi possível registar o utilizador.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão", "Falha ao comunicar com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Navbar Superior Padrão */}
      <View style={styles.navbar}>
        <Text style={styles.navTitulo}>Adicionar Utilizador</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.navVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário de Cadastro */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Tipo de Utilizador</Text>
        <View style={styles.tipoContainer}>
          <TouchableOpacity 
            style={[styles.btnTipo, tipo === 'comum' && styles.tipoAtivo]} 
            onPress={() => setTipo('comum')}
          >
            <Text style={[styles.textoBtnTipo, tipo === 'comum' && styles.textoTipoAtivo]}>
              usuario
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnTipo, tipo === 'admin' && styles.tipoAtivo]} 
            onPress={() => setTipo('admin')}
          >
            <Text style={[styles.textoBtnTipo, tipo === 'admin' && styles.textoTipoAtivo]}>
              admin
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnSalvar} onPress={cadastrarUsuario}>
          <Text style={styles.textoSalvar}>Cadastrar Utilizador</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 45,
    backgroundColor: '#f8fafc',
    fontSize: 15,
    color: '#0f172a',
  },
  tipoContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  btnTipo: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  tipoAtivo: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  textoBtnTipo: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
  },
  textoTipoAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnSalvar: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});