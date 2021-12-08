import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './page/Home';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import { AuthService } from './service';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => {
  const navigation = useNavigation();
  useEffect(() => {
    AuthService.subscribeAuth((user) => {
      if (user) {
        navigation.navigate('Home' as never, {} as never);
      } else {
        navigation.navigate('SignIn' as never, {} as never);
      }
    });
  }, []);
  return (
    <Stack.Navigator initialRouteName={AuthService.auth.currentUser ? 'Home' : 'SignIn'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <></>
    </Stack.Navigator>
  );
};

export default Index;
