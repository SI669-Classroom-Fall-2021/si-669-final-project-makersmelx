import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import Route from './Route';

const Index: React.FC = () => (
    <NavigationContainer>
      <NativeBaseProvider>
        <Route />
      </NativeBaseProvider>
    </NavigationContainer>
  );

registerRootComponent(Index);
