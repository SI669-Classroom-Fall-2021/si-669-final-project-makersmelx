import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomTabs, { BottomTabView } from '../../component/BottomTabs';

const Index: React.FC = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Test Test',
    });
  }, [navigation]);
  return (
    <Box flex={1}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <BottomTabs>
        <BottomTabView
          icon={<Icon mb="1" as={<MaterialCommunityIcons name="home-outline" />} color="white" size="sm" />}
          iconSelected={<Icon mb="1" as={<MaterialCommunityIcons name="home" />} color="white" size="sm" />}
          title={
            <Text color="white" fontSize="12">
              Home
            </Text>
          }
        >
          <Text>My Wish</Text>
        </BottomTabView>
        <BottomTabView title="Friends">
          <Text>heyhey234</Text>
        </BottomTabView>
        <BottomTabView title="Profile">
          <Text>heyhey2345</Text>
        </BottomTabView>
      </BottomTabs>
      <StatusBar />
    </Box>
  );
};

export default Index;
