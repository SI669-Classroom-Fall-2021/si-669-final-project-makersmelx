import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { WishService } from '../../service';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import WishListStack from '../WishList';
import Friends from '../Friends';
import Claimed from '../Claimed';
import Settings from '../Settings';
import { AuthService } from '../../service';

const Tab = createMaterialBottomTabNavigator();

const Index: React.FC = () => {
  const navigation = useNavigation();
  useEffect(() => {
    AuthService.subscribeAuth((user) => {
      if (!user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' } as never],
        });
      }
    });
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  // eslint-disable-next-line no-unused-vars
  let unsubscriber;
  // const onNext = (snapshot: any) => {
  //   console.log(snapshot);
  // };
  // useEffect(() => {
  //   unsubscriber = WishService.onSnapShot([], onNext);
  // }, []);
  return (
    <Tab.Navigator
      activeColor="rgb(8,145,178)"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="WishListStack"
        component={WishListStack}
        options={{
          tabBarLabel: 'Wish List',
          tabBarIcon: (props: any) => <MaterialCommunityIcons
            name={props.focused ? 'gift' : 'gift-outline'}
            color={props.color}
            size={26}
          />
        }}
      />
      <Tab.Screen
        name="Claimed"
        component={Claimed}
        options={{
          tabBarLabel: 'Claimed',
          tabBarIcon: (props: any) => (
            <MaterialCommunityIcons
              name={props.focused ? 'bookmark-check' : 'bookmark-check-outline'}
              color={props.color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: (props: any) => (
            <MaterialCommunityIcons
              name={props.focused
                ? 'account-multiple'
                : 'account-multiple-outline'}
              color={props.color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: (props: any) => (
            <MaterialCommunityIcons
              name={props.focused ? 'cog' : 'cog-outline'}
              color={props.color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Index;
