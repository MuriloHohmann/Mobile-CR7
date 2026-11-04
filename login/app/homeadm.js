import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdmHome() {
  const router = useRouter();

  return (
    <ScrollView style={styles.body}>
      {/* Navbar do Administrador (Bootstrap #192a6b) */}
      <View style={styles.navbar}>
        <View style={styles.containerFluid}>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => alert('Você já está no Painel ADM')}
          >
            <Text style={[styles.navLink, styles.active]}>Início ADM</Text>
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

        {/* Botão de Sair / Voltar ao Login */}
        <TouchableOpacity 
          style={styles.btnLogout} 
          onPress={() => router.replace('/')}
        >
          <Text style={styles.btnLogoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo do Painel Administrativo */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Painel de Controle - Administrador</Text>
        <Text style={styles.subText}>Utilize a barra de navegação superior para gerenciar o estoque ou consultar as movimentações.</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containerFluid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  navItem: {
    paddingVertical: 6,
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 15,
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
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnLogoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
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