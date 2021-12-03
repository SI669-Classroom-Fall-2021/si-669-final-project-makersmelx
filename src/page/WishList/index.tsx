import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './list';
import Edit from './edit';

const WishStack = createNativeStackNavigator();

const WishList = () => (
    <WishStack.Navigator screenOptions={{ presentation: 'modal' }} initialRouteName="List">
      <WishStack.Screen name="list" component={List} />
      <WishStack.Screen name="edit" component={Edit} />
    </WishStack.Navigator>
  );

export default WishList;
