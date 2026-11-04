import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.body}>
      {/* Navbar do Bootstrap adaptada (#192a6b) */}
      <View style={styles.navbar}>
        <View style={styles.containerFluid}>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => alert('Página inicial')}
          >
            <Text style={[styles.navLink, styles.active]}>Página inicial</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/estoque')}
          >
            <Text style={styles.navLink}>Estoque</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Sair / Voltar ao Login */}
        <TouchableOpacity 
          style={styles.btnLogout} 
          onPress={() => router.replace('/index.js')}
        >
          <Text style={styles.btnLogoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo Funcional */}
      <View style={styles.content}>
        {/* Espaço livre para adicionar novos elementos e telas do TCC */}
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
    gap: 20,
  },
  navItem: {
    paddingVertical: 6,
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
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
    paddingTop: 20,
  },
});