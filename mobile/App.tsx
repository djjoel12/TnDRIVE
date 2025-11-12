import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import CompanyAuthScreen from './screens/CompanyAuthScreen';
import CompanyRegisterScreen from './screens/CompanyRegisterScreen';
import CompanyLoginScreen from './screens/CompanyLoginScreen';
import TravelerHomeScreen from './screens/TravelerHomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CompanyAuth" 
          component={CompanyAuthScreen}
          options={{ title: 'Espace Compagnie' }}
        />
        <Stack.Screen 
          name="CompanyRegister" 
          component={CompanyRegisterScreen}
          options={{ title: 'Inscription Compagnie' }}
        />
        <Stack.Screen 
          name="CompanyLogin" 
          component={CompanyLoginScreen}
          options={{ title: 'Connexion Compagnie' }}
        />
        <Stack.Screen 
          name="TravelerHome" 
          component={TravelerHomeScreen}
          options={{ title: 'Trajets disponibles' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}