import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendList from './FriendList';
import AddFriend from './AddFriend';
// import FriendRequest from './FriendRequest';


const Stack = createNativeStackNavigator();

const Index: React.FC = () => (
    <Stack.Navigator initialRouteName="Friends">
      <Stack.Screen name="FriendList" component={FriendList} />
      <Stack.Screen name="AddFriend" component={AddFriend} />
    </Stack.Navigator>
  );

export default Index;
