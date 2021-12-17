import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishList from './WishList';
import UpsertWishPage from './UpsertWishPage';
import { WishParamList } from './WishParamList';

const Stack = createNativeStackNavigator<WishParamList>();

const Index: React.FC = () => (
  <Stack.Navigator initialRouteName="WishList">
    <Stack.Screen name="WishList" component={WishList} />
    <Stack.Screen name="UpsertWish" component={UpsertWishPage} />
  </Stack.Navigator>
);

export default Index;
