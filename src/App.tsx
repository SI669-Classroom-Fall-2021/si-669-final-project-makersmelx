import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './page/Home';
import { AuthService } from './service';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => {
  useEffect(() => {
    AuthService.subscribeAuth();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(Index);
