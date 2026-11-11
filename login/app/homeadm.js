import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, StatusBar, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdmHome() {
  const router = useRouter();

  return (
    <ScrollView style={styles.body} contentContainerStyle={styles.scrollContainer}>
      {/* Navbar do Administrador */}
      <View style={styles.navbar}>
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

        <View style={styles.navBottomRow}>
          <TouchableOpacity 
            style={styles.btnCadastrar}
            onPress={() => router.push('/cadastroadm')}
          >
            <Text style={styles.cadastroadmText}>+ Cadastrar Usuário</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo com a Imagem de Fundo da Indústria */}
      <ImageBackground 
        source={require('../assets/industria.png')} 
        style={styles.contentBackground}
        imageStyle={styles.imageStyle}
      >
        {/* Overlay para escurecer levemente a foto de fundo e destacar os textos e a foto */}
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Administrador</Text>
          <Text style={styles.subText}>E ESSA FOI A EQUIPE REPRESENTANTE DO NOSSO APP!</Text>
          
          {/* Foto da equipe posisionada exatamente abaixo dos textos */}
          <Image 
            source={require('../assets/us.jpg')} 
            style={styles.swag} 
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#192a6b', // Mudado para combinar com a navbar e evitar flash branco
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%', // Força o container de scroll a cobrir toda a altura da tela
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
  // Estilos corrigidos para eliminar a borda branca
  contentBackground: {
    flex: 1, // Faz a imagem de fundo esticar preenchendo todo o espaço disponível
    width: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Escurece o fundo para destacar os textos
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 13,
    color: '#f1f1f1',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },
  swag: {
    width: 320,
    height: 320,
    borderRadius: 8,
    resizeMode: 'cover',
    marginTop: 10,
  },
});