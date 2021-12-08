import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import WishList from './WishList';
import UpsertWish from './UpsertWish';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Wish List',
      tabBarIcon: (props: any) => <MaterialCommunityIcons
        name="gift"
        color={props.color}
        size={26}
      />,
    });
  });
  return (
    <Stack.Navigator initialRouteName="WishList">
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="UpsertWish" component={UpsertWish} />
    </Stack.Navigator>
  );
};

export default Index;
