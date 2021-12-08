import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishList from './WishList';
import UpsertWish from './UpsertWish';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
    <Stack.Navigator initialRouteName="WishList">
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="UpsertWish" component={UpsertWish} />
    </Stack.Navigator>
  );

export default Index;
