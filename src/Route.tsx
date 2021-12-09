import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './page/Home';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import { AuthService } from './service';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
  <Stack.Navigator initialRouteName={AuthService.auth.currentUser ? 'Home' : 'SignIn'}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

export default Index;
