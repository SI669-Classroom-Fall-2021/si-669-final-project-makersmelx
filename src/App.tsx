import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import Route from './Route';
import { AuthProvider } from './auth/AuthProvider';

const Index: React.FC = () => (
  <NavigationContainer>
    <NativeBaseProvider>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </NativeBaseProvider>
  </NavigationContainer>
);

registerRootComponent(Index);
