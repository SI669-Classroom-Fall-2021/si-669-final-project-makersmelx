import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { WishService } from '../../service';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'native-base';
import WishListStack from '../WishList';
import Friends from '../Friends';
import Claimed from '../Claimed';
import Settings from '../Settings';

const Tab = createMaterialBottomTabNavigator();

const Index: React.FC = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      activeColor={(colors.primary as any)['500']}
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="WishListStack"
        component={WishListStack}
        options={{
          tabBarLabel: 'Wish List',
          tabBarIcon: (props: any) => <MaterialCommunityIcons
            name={props.focused ? 'heart' : 'heart-outline'}
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
