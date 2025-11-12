import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Linking
} from 'react-native';

export default function TravelerHomeScreen({ navigation }: any) {
  const [trajets, setTrajets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Charger les trajets au démarrage
  useEffect(() => {
    loadTrajets();
  }, []);

  const loadTrajets = async () => {
    try {
      // ✅ URL relative grâce au proxy
      const response = await fetch('/api/trajets');
      
      if (response.ok) {
        const data = await response.json();
        setTrajets(data);
      } else {
        Alert.alert('Erreur', 'Impossible de charger les trajets');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTrajets();
  };

  // Fonction de réservation via WhatsApp
  const reserverViaWhatsApp = (trajet: any) => {
    const message = `Bonjour ${trajet.company.nom} !\n\nJe souhaite réserver un trajet :\n🚗 ${trajet.depart} → ${trajet.arrivee}\n🕒 ${trajet.heure}\n💰 ${trajet.prix} FCFA\n\nMerci de me confirmer la disponibilité.`;
    
    const whatsappUrl = `whatsapp://send?phone=${trajet.company.whatsapp}&text=${encodeURIComponent(message)}`;
    
    // Ouvrir WhatsApp
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'WhatsApp non disponible',
        'Ouvrez WhatsApp manuellement et contactez: ' + trajet.company.whatsapp
      );
    });
  };

  // Données mockées en attendant l'API
  const trajetsMock = [
    {
      _id: '1',
      depart: 'Abidjan',
      arrivee: 'Bouaké',
      heure: '08:00',
      prix: 5000,
      places: 12,
      company: {
        nom: 'UTB Transport',
        whatsapp: '+2250700000001',
      },
    },
    {
      _id: '2',
      depart: 'Abidjan',
      arrivee: 'Yamoussoukro',
      heure: '10:30',
      prix: 4000,
      places: 8,
      company: {
        nom: 'STC Voyages',
        whatsapp: '+2250700000002',
      },
    },
    {
      _id: '3',
      depart: 'Abidjan',
      arrivee: 'San Pedro',
      heure: '14:00',
      prix: 6000,
      places: 15,
      company: {
        nom: 'Ocean Transport',
        whatsapp: '+2250700000003',
      },
    },
  ];

  // Utiliser les mock data en attendant l'API
  const trajetsAffiches = trajets.length > 0 ? trajets : trajetsMock;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.loadingText}>Chargement des trajets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trajets Disponibles</Text>
      <Text style={styles.subtitle}>Réservez directement via WhatsApp</Text>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#FF6B00']}
            tintColor="#FF6B00"
          />
        }
      >
        {trajetsAffiches.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun trajet disponible</Text>
            <Text style={styles.emptySubtext}>
              Les compagnies ajouteront bientôt leurs trajets
            </Text>
          </View>
        ) : (
          trajetsAffiches.map((trajet) => (
            <View key={trajet._id} style={styles.trajetCard}>
              {/* En-tête avec compagnie */}
              <View style={styles.cardHeader}>
                <Text style={styles.companyName}>🏢 {trajet.company.nom}</Text>
                <View style={styles.placesContainer}>
                  <Text style={styles.placesText}>
                    {trajet.places} place{trajet.places > 1 ? 's' : ''} restante{trajet.places > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>

              {/* Détails du trajet */}
              <View style={styles.trajetDetails}>
                <View style={styles.route}>
                  <Text style={styles.depart}>{trajet.depart}</Text>
                  <Text style={styles.arrow}>→</Text>
                  <Text style={styles.arrivee}>{trajet.arrivee}</Text>
                </View>

                <View style={styles.infos}>
                  <Text style={styles.heure}>🕒 {trajet.heure}</Text>
                  <Text style={styles.prix}>💰 {trajet.prix.toLocaleString()} FCFA</Text>
                </View>
              </View>

              {/* Bouton de réservation */}
              <TouchableOpacity
                style={styles.reserverButton}
                onPress={() => reserverViaWhatsApp(trajet)}
              >
                <Text style={styles.reserverText}>📱 Réserver via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Pied de page informatif */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 La réservation se fait directement avec la compagnie via WhatsApp
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  trajetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  placesContainer: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  placesText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  trajetDetails: {
    marginBottom: 16,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  depart: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  arrow: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#666666',
  },
  arrivee: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heure: {
    fontSize: 14,
    color: '#666666',
  },
  prix: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  reserverButton: {
    backgroundColor: '#25D366', // Vert WhatsApp
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reserverText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderTopWidth: 1,
    borderTopColor: '#BBDEFB',
  },
  footerText: {
    fontSize: 12,
    color: '#1976D2',
    textAlign: 'center',
  },
});