import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './Menu';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
  <Stack.Navigator initialRouteName="Menu">
    <Stack.Screen name="Menu" component={Menu} />
  </Stack.Navigator>
);

export default Index;
