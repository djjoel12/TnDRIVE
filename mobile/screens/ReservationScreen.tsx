import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';

export default function ReservationScreen({ route }: any) {
  const { from, to } = route.params || { from: 'Abidjan', to: 'Bouaké' };
  const [selectedPlaces, setSelectedPlaces] = useState<number | null>(1);

  const handleReserve = () => {
    Alert.alert(
      "Réservation confirmée ✅",
      `Trajet : ${from} → ${to}\nHeure : 08h00\nPlaces : ${selectedPlaces}\nPrix : ${selectedPlaces! * 5000} FCFA`,
      [
        {
          text: "Contacter via WhatsApp",
          onPress: () => {
            const msg = `Bonjour 👋, je souhaite réserver ${selectedPlaces} place(s) pour le trajet ${from} → ${to} à 08h00.`;
            const whatsappUrl = `https://wa.me/2250700000000?text=${encodeURIComponent(msg)}`;
            Linking.openURL(whatsappUrl);
          },
        },
        { text: "Fermer" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réserver un trajet</Text>

      <View style={styles.route}>
        <Text style={styles.routeText}>{from} → {to}</Text>
        <Text style={styles.details}>08:00 • 5.000 FCFA / place</Text>
      </View>

      <View style={styles.places}>
        <Text style={styles.sectionTitle}>Nombre de places :</Text>
        <View style={styles.placeButtons}>
          {[1, 2, 3, 4].map((n) => (
            <TouchableOpacity 
              key={n}
              style={[
                styles.placeButton,
                selectedPlaces === n && styles.selectedPlaceButton
              ]}
              onPress={() => setSelectedPlaces(n)}
            >
              <Text style={[
                styles.placeText,
                selectedPlaces === n && styles.selectedPlaceText
              ]}>
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
        <Text style={styles.reserveText}>Réserver maintenant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  route: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    color: '#666',
    marginTop: 5,
  },
  places: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  placeButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  placeButton: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedPlaceButton: {
    backgroundColor: '#FF6B00',
  },
  placeText: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  selectedPlaceText: {
    color: '#FFF',
  },
  reserveButton: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  reserveText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
