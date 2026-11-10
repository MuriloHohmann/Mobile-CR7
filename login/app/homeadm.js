import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdmHome() {
  const router = useRouter();

  return (
    <ScrollView style={styles.body}>
      {/* Navbar do Administrador */}
      <View style={styles.navbar}>
        {/* Linha superior: Abas principais + Botão Sair */}
        <View style={styles.navTopRow}>
          <View style={styles.containerFluid}>
            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => alert('Você já está no Painel ADM')}
            >
              <Text style={[styles.navLink, styles.active]}>Home ADM</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => router.push('/estoqueadm')}
            >
              <Text style={styles.navLink}>Estoque ADM</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => router.push('/movimentacoes')}
            >
              <Text style={styles.navLink}>Movimentações</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.btnLogout} 
            onPress={() => router.replace('/')}
          >
            <Text style={styles.btnLogoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Linha inferior: Botão de Cadastrar Usuário */}
        <View style={styles.navBottomRow}>
          <TouchableOpacity 
            style={styles.btnCadastrar}
            onPress={() => router.push('/cadastroadm')}
          >
            <Text style={styles.cadastroadmText}>+ Cadastrar Usuário</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo do Painel Administrativo */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Painel de Controle - Administrador</Text>
        <Text style={styles.subText}>E ESSA FOI A EQUIPE REPRESENTANTE DO NOSSO APP!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    backgroundColor: '#192a6b',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 45,
    paddingBottom: 15,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  navTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  containerFluid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navItem: {
    paddingVertical: 4,
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '500',
  },
  active: {
    color: '#ffffff',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  btnLogout: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnLogoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  navBottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.88)',
    paddingTop: 10,
  },
  btnCadastrar: {
    backgroundColor: 'rgba(26, 206, 20, 0.84)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cadastroadmText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});