import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { WishService } from '../../service';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Column, Text, useTheme } from 'native-base';
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

  const NaviIcon = (props: any, title: string, iconName: string) => (
    <Column
      width={50}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <MaterialCommunityIcons
        name={iconName}
        color={props.color}
        size={24}
      />
      <Text color={props.color} fontSize={10}>{title}</Text>
    </Column>
  )

  return (
    <Tab.Navigator
      activeColor={(colors.primary as any)['500']}
      barStyle={{ backgroundColor: 'white' }}
      labeled={false}
    >
      <Tab.Screen
        name="WishListStack"
        component={WishListStack}
        options={{
          tabBarIcon: (iconProps: any) => NaviIcon(
            iconProps, 'Wish List',
            iconProps.focused ? 'heart' : 'heart-outline'
          )
        }}
      />
      <Tab.Screen
        name="Claimed"
        component={Claimed}
        options={{
          tabBarIcon: (iconProps: any) =>
            NaviIcon(iconProps, 'Claimed', iconProps.focused
              ? 'bookmark-check'
              : 'bookmark-check-outline')
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: (iconProps: any) =>
            NaviIcon(iconProps, 'Friends', iconProps.focused
              ? 'account-multiple'
              : 'account-multiple-outline')
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: (iconProps: any) =>
            NaviIcon(iconProps, 'Settings', iconProps.focused
              ? 'cog'
              : 'cog-outline')
        }}
      />
    </Tab.Navigator>
  );
};

export default Index;
