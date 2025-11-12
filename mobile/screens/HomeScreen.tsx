import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Text style={styles.logo}>
        <Text style={styles.orange}>Tn</Text>
        <Text style={styles.black}>DRIVE</Text>
      </Text>
      <Text style={styles.subtitle}>Ton transport, simplifié</Text>

      {/* FORMULAIRE */}
      <View style={styles.form}>
        <TextInput
          placeholder="Ville de départ"
          style={styles.input}
          value={fromCity}
          onChangeText={setFromCity}
        />
        <TextInput
          placeholder="Ville d'arrivée"
          style={styles.input}
          value={toCity}
          onChangeText={setToCity}
        />

        <TouchableOpacity 
          style={styles.searchButton}
          disabled={!fromCity || !toCity}
          onPress={() => navigation.navigate('Reservation', { from: fromCity, to: toCity })}
        >
          <Text style={styles.searchText}>Rechercher un trajet</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 36,
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
  },
  form: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  searchButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    padding: 15,
  },
  searchText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
