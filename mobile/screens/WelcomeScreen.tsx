import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={styles.orange}>Tn</Text>
        <Text style={styles.black}>DRIVE</Text>
      </Text>
      <Text style={styles.subtitle}>Qui êtes-vous ?</Text>

      <TouchableOpacity 
        style={styles.choiceButton}
        onPress={() => navigation.navigate('TravelerHome')}
      >
        <Text style={styles.choiceText}>🚗 Je suis un voyageur</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.choiceButton}
        onPress={() => navigation.navigate('CompanyAuth')}
      >
        <Text style={styles.choiceText}>🏢 Je suis une compagnie</Text>
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
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  orange: {
    color: '#FF6B00',
  },
  black: {
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 50,
  },
  choiceButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6B00',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  choiceText: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});