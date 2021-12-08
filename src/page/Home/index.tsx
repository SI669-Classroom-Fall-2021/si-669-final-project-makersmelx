import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { WishService } from '../../service';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import WishList from '../WishList';

const Tab = createMaterialBottomTabNavigator();

const Index: React.FC = () => {
  const navigation = useNavigation();
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
    <Tab.Navigator activeColor="rgb(8,145,178)" barStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen name="WishList" component={WishList} />
    </Tab.Navigator>
  );
};

export default Index;
