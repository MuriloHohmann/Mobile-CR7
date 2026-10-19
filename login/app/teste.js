import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router' ;

// You can import supported modules from npm
import { Card } from 'react-native-paper';

export default function Teste() {

  return (
    <View style={styles.container}>
      
    <Link href="/" asChild>
      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>
    </Link>

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
 

  btnLogin: {
    backgroundColor: '#1b1464',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});