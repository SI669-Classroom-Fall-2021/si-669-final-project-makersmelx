import React, { useEffect, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomTabs, { BottomTabView } from '../../component/BottomTabs';
// import { WishService } from '../../service';
import List from '../WishList/list'

const Index: React.FC = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Test Test',
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
    <Box flex={1}>
      <BottomTabs viewStyle={{height: '100%', width: '100%'}}>
        <BottomTabView
          icon={<Icon mb="1" as={<MaterialCommunityIcons name="home-outline" />}
                      color="white" size="sm" />}
          iconSelected={<Icon mb="1" as={<MaterialCommunityIcons name="home" />}
                              color="white" size="sm" />}
          title={
            <Text color="white" fontSize="12">
              Home
            </Text>
          }
        >
          <Text>My Wish</Text>
          <Button
            onPress={() => {
              navigation.navigate('SignUp' as never, {} as never);
            }}
          >
            Sign Up
          </Button>
        </BottomTabView>
        <BottomTabView title="Friends">
          <Text>heyhey234</Text>
          <List />
        </BottomTabView>
        <BottomTabView title="Profile">
          <Text>heyhey2345</Text>
        </BottomTabView>
      </BottomTabs>
    </Box>
  );
};

export default Index;
