import React, { useLayoutEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  ScrollView,
  Text,
  useToast,
  VStack
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequest } from 'ahooks';
import { AuthService, ClaimService, IWish, WishService } from '../../service';

const Index: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {
    content,
    friendID
  }: { content: IWish; friendID: string } = route.params;
  const toast = useToast();
  const claimFailToast = 'claim-fail-toast';
  useLayoutEffect(() => {
    // todo: should be the friend name
    navigation.setOptions({
      title: content.name,
    });
  });
  const { run, loading } = useRequest(
    async () => {
      await ClaimService.claimWish(
        AuthService.auth.currentUser?.uid || '', friendID, content.key);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.goBack();
      },
      onError: () => {
        toast.show({
          title: 'User not found',
          status: 'error',
          id: claimFailToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );
  return (
    <Center flex={1}>
      <Center style={{ height: '100%', width: '100%' }} bg="white">
        <VStack style={{ height: '100%', width: '90%' }}>
          <HStack
            flex={0.5}
            justifyContent="space-between"
            alignItems="center"
            mt={6}
          >
            <Heading size="lg" textAlign="left" padding={3}>
              {content.name}
            </Heading>
            <Text fontSize="lg" padding={3}>{`$${content.price}`}</Text>
          </HStack>

          <Center flex={3} marginBottom={3} h="30%">
            <Image
              size="100%"
              resizeMode="cover"
              mt={6}
              source={{
                uri: content.image,
              }}
              alt="gift"
              borderRadius={6}
              fallbackElement={<MaterialCommunityIcons
                name="gift-outline"
                color="black"
                size={30}
              />}
            />
          </Center>
          <Box flex={3}>
            <Box bg="white" paddingX={5} paddingY={3} mt={2}>
              <ScrollView>
                <Text>{content.description}</Text>
              </ScrollView>
            </Box>
            <Box
              bg="white"
              paddingX={5}
              paddingY={3}
              borderRadius={6}
              borderColor="gray.200"
              borderWidth={1}
            >
              <Link
                href={content.url}
                isExternal
                _text={{
                  _light: {
                    color: 'cyan.500',
                  },
                  color: 'cyan.300',
                }}
                isUnderlined
              >
                Navigate to the external website
              </Link>
            </Box>
            <Button
              isLoading={loading}
              isDisabled={content.state !== WishService.WishState.Default}
              onPress={run}
              mt={10}
            >
              Claim for my friend
            </Button>
          </Box>
        </VStack>
      </Center>
    </Center>
  );
};

export default Index;
