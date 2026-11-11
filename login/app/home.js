import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, StatusBar, ImageBackground, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.body} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Navbar padronizada idêntica à outra tela */}
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
          onPress={() => router.replace('/')}
        >
          <Text style={styles.btnLogoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      
      <ImageBackground 
        source={require('../assets/industria.png')} 
        style={styles.contentBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Seja bem vindo a home do Almoxarifado!</Text>
          <Text style={styles.subText}>E ESSA FOI A EQUIPE REPRESENTANTE DO NOSSO APP!</Text>
          
          
          <Image 
            source={require('../assets/us.jpg')} 
            style={styles.swag} 
            resizeMode="cover"
          />
        </View>
      </ImageBackground>
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 45,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  containerFluid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navItem: {
    paddingVertical: 4,
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
  contentBackground: {
    flex: 1,
    width: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  swag: {
    width: width - 40,
    height: (width - 40) * 1.1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#192a6b',
  },
});