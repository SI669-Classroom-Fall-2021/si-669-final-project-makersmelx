import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import Home from './page/Home';
import SignUp from './page/SignUp';
import { AuthService } from './service';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => {
  useEffect(() => {
    AuthService.subscribeAuth();
  }, []);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

registerRootComponent(Index);
