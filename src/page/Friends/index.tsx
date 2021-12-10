import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendList from './FriendList';
import AddFriend from './AddFriend';
import FriendWishList from './FriendWishList';
import FriendWish from './FriendWish';
// import FriendRequest from './FriendRequest';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
  <Stack.Navigator initialRouteName="FriendList">
    <Stack.Screen name="FriendList" component={FriendList} />
    <Stack.Screen name="AddFriend" component={AddFriend} />
    <Stack.Screen name="FriendWishList" component={FriendWishList} />
    <Stack.Screen name="FriendWish" component={FriendWish} />
  </Stack.Navigator>
);

export default Index;
