import React from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
  ScrollView,
  useToast
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequest } from 'ahooks';
import { AuthService, ClaimService, IWish, WishService } from '../../service';

const Index: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { content, friendID }: { content: IWish; friendID: string } =
    route.params;
  const toast = useToast();
  const claimFailToast = 'claim-fail-toast';
  const { run, loading } = useRequest(
    async () => {
      ClaimService.claimWish(
        AuthService.auth.currentUser?.uid || '',
        friendID,
        content.key,
      );
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
      <Box style={{ height: '100%', width: '90%' }}>
        <VStack style={{ height: '100%', width: '100%' }}>
          <HStack flex={0.5} justifyContent="space-between" alignItems="center">
            <Heading size="lg" textAlign="left" padding={3}>
              {content.name}
            </Heading>
            <Text fontSize="lg" padding={3}>{`$${content.price}`}</Text>
          </HStack>
          <Center flex={3} marginBottom={3} h="30%">
            <Image
              size="100%"
              resizeMode="cover"
              borderRadius={10}
              source={{
                uri: content.image,
              }}
              alt="gift"
              fallbackElement={
                <MaterialCommunityIcons
                  name="gift-outline"
                  color="black"
                  size={30}
                />
              }
            />
          </Center>
          <Box flex={3}>
            <Box
              h="65%"
              bg="primary.100"
              marginY="3"
              borderRadius={10}
              paddingX={5}
              paddingY={3}
            >
              <Heading size="md" textAlign="left" marginY="1">
                Description
              </Heading>
              <ScrollView>
                <Text>{content.description}</Text>
              </ScrollView>
            </Box>
            <Box
              bg="primary.100"
              marginY="3"
              borderRadius={10}
              paddingX={5}
              paddingY={3}
            >
              <Link href={content.url} isExternal>
                {content.url}
              </Link>
            </Box>
          </Box>
          <Button
            isLoading={loading}
            marginBottom={3}
            isDisabled={content.state !== WishService.WishState.Default}
            onPress={run}
          >
            Claim for him
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Index;
