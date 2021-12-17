import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClaimList from './ClaimList';
import ClaimedFriendWish from './ClaimedFriendWish';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
  <Stack.Navigator initialRouteName="ClaimList ">
    <Stack.Screen name="ClaimList" component={ClaimList} />
    <Stack.Screen name="ClaimedFriendWish" component={ClaimedFriendWish} />
  </Stack.Navigator>
);

export default Index;
