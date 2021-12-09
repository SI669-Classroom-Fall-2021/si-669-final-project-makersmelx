import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthService} from '../../service';

const image =
  'data:image/png;base64,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';
const name = 'Shi Li';

const Index: React.FC = () => {
  const [userID, setUserID] = useState('');
  useEffect(() => {
    AuthService.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(AuthService.auth.currentUser?.uid || '');
      }
    });
  }, []);
  

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerRight: () => (
        <Pressable>
          <MaterialCommunityIcons
            name="dots-horizontal"
            color="black"
            size={26}
          />
        </Pressable>
      ),
    });
  });

  return (
    <Box style={{ width: '100%', height: '100%' }} flex={1}>
      <Flex direction="column" h="100%">
        <Center flex={1} paddingTop="50">
        <Pressable 
            // onPress={() => {
            //   AuthService.signOut();
            // }}
            width="100%"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <HStack justifyContent = "flex-start" width="80%" alignItems="center">
            <Avatar
              size="lg"
              marginX = "18"
              backgroundColor="white"
              source={{
                uri: image,
              }}
            >
              <MaterialCommunityIcons
                name="gift-outline"
                color="black"
                size={30}
              />
            </Avatar>
            <Text fontWeight="600" textAlign="center" padding="5" fontSize="30">
              {name}
            </Text>
            </HStack>
          </Pressable>
        </Center>
        
        <VStack flex={4} >
        <Pressable
            // onPress={() => {
            //   AuthService.signOut();
            // }}
            width="100%"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <HStack justifyContent="space-between" width="80%">
              <Text fontWeight="600" textAlign="left" padding="5" fontSize="20">
                Edit Profile
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => {
              AuthService.signOut();
            }}
            width="100%"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
              <HStack justifyContent="space-between" width="80%">
                <Text
                  fontWeight="600"
                  textAlign="left"
                  padding="5"
                  fontSize="20"
                >
                  Log out
                </Text>
              </HStack>
          </Pressable>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;
