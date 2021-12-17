import React, { useLayoutEffect } from 'react';
import {
  Button,
  Center,
  Column,
  Divider,
  Link,
  Row,
  ScrollView,
  Text,
  useToast,
  VStack
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import { MaterialIcons } from '@expo/vector-icons';
import { ClaimService, WishService } from '../../service';
import { useAuth } from '../../auth/AuthProvider';
import LoadingImageBackground from '../../component/LoadingImageBackground';

const Index: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { content, friend } = route.params;
  const toast = useToast();
  const claimToast = 'claim-fail-toast';
  useLayoutEffect(() => {
    // todo: should be the friend name
    navigation.setOptions({
      title: `${content.name} (${friend.username})`,
    });
  });
  const auth = useAuth();
  const { run, loading } = useRequest(
    async () => {
      if (!auth.user) {
        throw new Error('Sign In to claim this wish');
      }
      await ClaimService.claimWish(auth.user.uid, friend.ID, content.key);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.goBack();
        toast.show({
          title: `Claimed ${content.name} for ${friend.username}`,
          status: 'success',
          id: claimToast,
          placement: 'top',
          duration: 3000,
        });
      },
      onError: (error) => {
        toast.show({
          title: error.message,
          status: 'error',
          id: claimToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );
  return (
    <Center flex={1}>
      <Center height="100%" width="100%" backgroundColor="white">
        <VStack height="100%" width="100%" space={6}>
          <Center flex={0.7}>
            <LoadingImageBackground
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              source={{
                uri: content.image,
              }}
            >
              <Center flex={1}>
                <Row
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  mt="auto"
                  backgroundColor="rgba(0,0,0,0.4)"
                >
                  <Row justifyContent="space-between" width="90%" py={2}>
                    <Text
                      fontSize="lg"
                      textAlign="left"
                      color="white"
                      fontWeight="800"
                    >
                      {content.name}
                    </Text>
                    <Text
                      fontSize="lg"
                      color="white"
                      fontWeight="600"
                    >{`$${content.price}`}</Text>
                  </Row>
                </Row>
              </Center>
            </LoadingImageBackground>
          </Center>
          <Column
            width="100%"
            space={6}
            alignItems="center"
            justifyContent="center"
          >
            <ScrollView width="90%">
              <Row space={3} alignItems="flex-start">
                <MaterialIcons name="description" size={24} />
                <Text textAlign="left" width="90%">
                  {content.description}
                </Text>
              </Row>
            </ScrollView>
            <Divider />
            <Row width="90%" space={3}>
              <MaterialIcons
                name={content.url ? 'public' : 'public-off'}
                size={24}
              />
              {content.url ? (
                <Link href={content.url} isExternal flex={1}>
                  <Text numberOfLines={1} underline color="cyan.500">
                    {content.url}
                  </Text>
                </Link>
              ) : (
                <Text flex={1} color="muted.500">
                  {`${friend.username} has not provided a link yet`}
                </Text>
              )}
            </Row>
          </Column>
          <Divider />
          <Center mt={6}>
            <Button
              width="90%"
              isLoading={loading}
              isDisabled={content.state !== WishService.WishState.Default}
              onPress={run}
            >
              {`Claim for ${friend.username}`}
            </Button>
          </Center>
        </VStack>
      </Center>
    </Center>
  );
};

export default Index;
