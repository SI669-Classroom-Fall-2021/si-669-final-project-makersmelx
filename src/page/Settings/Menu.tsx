import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Column,
  Divider,
  FlatList,
  Pressable,
  Row,
  Text,
  useToast
} from 'native-base';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequest } from 'ahooks';
import { AuthService } from '../../service';
import { gravatarUrl } from '../../utils';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};
const Index: React.FC = () => {
  const [profile, setProfile] = useState({ name: 'user', gravatar: 'none' });
  const toast = useToast();
  useEffect(() => {
    (async () => {
      const p = await AuthService.getProfile();
      if (p) {
        setProfile(p as any);
      }
    })();
  }, []);

  const { run: signOut, loading } = useRequest(async () => {
    await AuthService.signOut();
  }, {
    manual: true,
    onError: () => {
      toast.show({
        title: 'Sign Out Failed',
        status: 'error',
        placement: 'top',
        duration: 3000,
      });
    }
  })

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
    <Box
      width="100%"
      height="100%"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      flex={1}
      bg="white"
    >
      <Center width="100%">
        <Row
          alignItems="center"
          space={4}
          py="10px"
          justifyContent="center"
          width="90%"
          mt={6}
        >
          <Column flex={0.8}>
            <Image
              source={{
                uri: gravatarUrl(profile.gravatar),
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100
              }}
            />
          </Column>
          <Column
            flex={2}
            alignItems="flex-start"
            space={2}
            justifyContent="center"
          >
            <Text fontWeight="600" textAlign="left" {...textProps}>
              {(profile as any).username}
            </Text>
            <Text fontWeight="600" textAlign="left" {...textProps}>
              {(profile as any).email}
            </Text>
          </Column>
          <Row flex={1} justifyContent="flex-end" />
        </Row>
        <Divider mt="6" />
        <FlatList
          width="100%"
          data={[
            { icon: 'account-circle', title: 'Your Profile' },
            { icon: 'cog', title: 'Settings' }]}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Center width="100%">
              <Row
                alignItems="center"
                space={4}
                py="10px"
                justifyContent="center"
                width="90%"
                mt={4}
              >
                <Column flex={0.8}>
                  <Center flex={1}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      color="black"
                      size={30}
                    />
                  </Center>
                </Column>
                <Column
                  flex={2}
                  alignItems="flex-start"
                  space={2}
                  justifyContent="center"
                >
                  <Text fontWeight="600" textAlign="left" {...textProps}>
                    {item.title}
                  </Text>
                </Column>
                <Row flex={1} justifyContent="flex-end" />
              </Row>
            </Center>
          )}
        />
        <Divider mt="6" />
        <Button
          mt={12}
          width="90%"
          bg='red.500'
          isLoading={loading}
          onPress={async () => {
            await signOut();
          }}
        >Sign Out</Button>
      </Center>
    </Box>
  );
};

export default Index;
