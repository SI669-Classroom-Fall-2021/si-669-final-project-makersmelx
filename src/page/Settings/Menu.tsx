import React, { useLayoutEffect } from 'react';
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

import { gravatarUrl } from '../../utils';
import { useAuth } from '../../auth/AuthProvider';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};
const Index: React.FC = () => {
  const toast = useToast();
  const auth = useAuth();
  const navigation = useNavigation();
  const { run: signOut, loading } = useRequest(async () => {
    await auth.signOut();
  }, {
    manual: true,
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }] as never,
      });
    },
    onError: () => {
      toast.show({
        title: 'Sign Out Failed',
        status: 'error',
        placement: 'top',
        duration: 3000,
      });
    }
  });

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
      flex={1}
      bg="white"
    >
      <Center width="100%">
        <Row
          alignItems="center"
          space={8}
          py={3}
          justifyContent="flex-start"
          width="80%"
          mt={6}
        >
          <Column>
            <Image
              source={{
                uri: gravatarUrl(auth.profile.gravatar),
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100
              }}
            />
          </Column>
          <Column
            alignItems="flex-start"
            space={2}
            justifyContent="center"
          >
            <Text fontWeight="semibold" textAlign="left" {...textProps}>
              {(auth.profile as any).username}
            </Text>
            <Text fontWeight="semibold" textAlign="left" {...textProps}>
              {(auth.profile as any).email}
            </Text>
          </Column>
          <Row flex={1} justifyContent="flex-end" />
        </Row>
        <Divider mt="6" />
        <FlatList
          mt={6}
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
                py={4}
                justifyContent="center"
                width="80%"
              >
                <Column>
                  <Center flex={1}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      color="black"
                      size={30}
                    />
                  </Center>
                </Column>
                <Column
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold" textAlign="left" {...textProps}>
                    {item.title}
                  </Text>
                </Column>
                <Row flex={1} justifyContent="flex-end" />
              </Row>
            </Center>
          )}
        />
        <Divider mt={6} />
        <Button
          mt={12}
          width="90%"
          bg="danger.500"
          _text={{
            fontWeight: 'semibold'
          }}
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
