import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

// ✅ URL COMPLÈTE - Le proxy Expo ne marche pas
const API_URL = 'http://localhost:5000/api';

export default function CompanyRegisterScreen({ navigation }: any) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('🎯 1 - Bouton cliqué');
    
    if (!nom || !email || !whatsapp || !motDePasse) {
      console.log('❌ 2 - Champs manquants');
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    console.log('✅ 3 - Tous les champs remplis:', { nom, email, whatsapp });
    
    setLoading(true);
    
    try {
      console.log('🚀 4 - Début de la requête fetch');
      
      // ✅ URL COMPLÈTE au lieu de /api/...
      const response = await fetch(`${API_URL}/companies/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          email,
          whatsapp,
          motDePasse,
        }),
      });

      console.log('📡 5 - Réponse reçue, status:', response.status);
      
      const data = await response.json();
      console.log('📦 6 - Données reçues:', data);

      if (response.ok) {
        console.log('✅ 7 - Inscription réussie');
        Alert.alert('Succès', 'Compte créé avec succès', [
          { text: 'OK', onPress: () => navigation.navigate('CompanyLogin') }
        ]);
      } else {
        console.log('❌ 8 - Erreur backend:', data.message);
        Alert.alert('Erreur', data.message || 'Erreur lors de la création');
      }
    } catch (error) {
      console.log('💥 9 - Erreur fetch:', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur: ' + error.message);
    } finally {
      console.log('🔚 10 - Finally executé');
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription Compagnie</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de la compagnie"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Numéro WhatsApp"
        keyboardType="phone-pad"
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={motDePasse}
        onChangeText={setMotDePasse}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Création...' : 'Créer mon compte'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CompanyLogin')}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#FF6B00',
    textAlign: 'center',
    marginTop: 20,
  },
});