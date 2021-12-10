import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClaimList from './ClaimList';
import Detail from './Detail';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
  <Stack.Navigator initialRouteName="ClaimList ">
    <Stack.Screen name="ClaimList" component={ClaimList} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
);

export default Index;
