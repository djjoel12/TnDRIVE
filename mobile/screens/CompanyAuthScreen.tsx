import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CompanyAuthScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Compagnie</Text>
      
      <TouchableOpacity 
        style={styles.authButton}
        onPress={() => navigation.navigate('CompanyRegister')}
      >
        <Text style={styles.authText}>📝 Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.authButton}
        onPress={() => navigation.navigate('CompanyLogin')}
      >
        <Text style={styles.authText}>🔑 Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: '#333333',
  },
  authButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  authText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backText: {
    color: '#FF6B00',
    textAlign: 'center',
    marginTop: 20,
  },
});