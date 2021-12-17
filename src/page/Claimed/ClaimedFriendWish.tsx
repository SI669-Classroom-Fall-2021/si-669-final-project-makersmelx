import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Button,
  Center,
  Column,
  Divider,
  Icon,
  Link,
  Row,
  ScrollView,
  Spinner,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getDoc } from 'firebase/firestore';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequest } from 'ahooks';
import { ClaimService, IClaim, IWish, WishService } from '../../service';
import LoadingImageBackground from '../../component/LoadingImageBackground';
import { useAuth } from '../../auth/AuthProvider';

const Index: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { content, userID }: { content: IClaim; userID: string } = route.params;

  const [wishInfo, setWishInfo] = useState<IWish>({
    name: content.name,
    url: '',
    description: '',
    image: content.image,
    price: content.price,
    createdAt: '',
    state: 1,
    key: content.wishID,
  });

  const toast = useToast();
  const sentToast = 'sent-fail-toast';

  const fetchWish = useRequest(
    async () => {
      const wishRef = WishService.getWishRef(content.wisherID, content.wishID);
      const wishSnap = await getDoc(wishRef);
      const wishInfoTmp = wishSnap.data();
      if (wishInfoTmp) {
        setWishInfo({
          name: wishInfoTmp.name,
          url: wishInfoTmp.url,
          description: wishInfoTmp.description,
          image: wishInfoTmp.image,
          price: wishInfoTmp.price,
          createdAt: wishInfoTmp.createdAt,
          state: wishInfoTmp.state,
          key: wishInfoTmp.wishID,
        });
      }
    },
    {
      manual: true,
      onError: (error) => {
        toast.show({
          title: error.message,
          status: 'error',
          id: sentToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );

  useEffect(() => {
    (async () => {
      await fetchWish.run();
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${content.name} (${content.wisherName})`,
    });
  });

  const auth = useAuth();
  const sentRequest = useRequest(
    async () => {
      if (!auth.user) {
        throw new Error('Sign In to complete this wish');
      }
      await ClaimService.completeClaim(
        userID, content.wisherID, content.wishID, content.claimID);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.goBack();
        toast.show({
          title: `Completed ${content.name} for ${content.wisherName}`,
          status: 'success',
          id: sentToast,
          placement: 'top',
          duration: 3000,
        });
      },
      onError: (error) => {
        toast.show({
          title: error.message,
          status: 'error',
          id: sentToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );

  const unClaimRequest = useRequest(
    async () => {
      if (!auth.user) {
        throw new Error('Sign In to unclaim this wish');
      }
      await ClaimService.declaimWish(
        userID, content.wisherID, content.wishID, content.claimID);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.goBack();
        toast.show({
          title: `Unclaimed ${content.name} for ${content.wisherName}`,
          status: 'success',
          id: sentToast,
          placement: 'top',
          duration: 3000,
        });
      },
      onError: (error) => {
        toast.show({
          title: error.message,
          status: 'error',
          id: sentToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );

  if (fetchWish.loading) {
    return (
      <Center width="100%" height="100%">
        <Spinner size="lg" color="gray.500" />
      </Center>
    );
  }

  return (
    <Center flex={1}>
      <Center height="100%" width="100%" backgroundColor="white">
        <VStack height="100%" width="100%" space={6}>
          <Center flex={0.8}>
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
            <Row width="90%" space={3}>
              <MaterialCommunityIcons name="account-multiple" size={24} />
              <Text flex={1} fontWeight="semibold">
                {content.wisherName}
              </Text>
            </Row>
            <Divider />
            <ScrollView width="90%">
              <Row space={3} alignItems="flex-start">
                <MaterialIcons name="description" size={24} />
                <Text textAlign="left" width="90%">
                  {wishInfo.description}
                </Text>
              </Row>
            </ScrollView>
            <Divider />
            <Row width="90%" space={3}>
              <MaterialIcons
                name={wishInfo.url ? 'public' : 'public-off'}
                size={24}
              />
              {wishInfo.url ? (
                <Link href={wishInfo.url} isExternal flex={1}>
                  <Text numberOfLines={1} underline color="cyan.500">
                    {wishInfo.url}
                  </Text>
                </Link>
              ) : (
                <Text flex={1} color="muted.500">
                  {`${content.wisherName} has not provided a link yet`}
                </Text>
              )}
            </Row>
          </Column>
          <Divider />
          <Center>
            <Row
              justifyContent="space-around"
              alignItems="center"
              mt={6}
              width="90%"
            >
              <Button
                onPress={sentRequest.run}
                isLoading={sentRequest.loading}
                isDisabled={content.state === ClaimService.ClaimState.Completed}
                leftIcon={<Icon
                  as={<MaterialCommunityIcons name="gift" />}
                  size="sm"
                />}
              >
                I&apos;ve sent the gift
              </Button>
              <Button
                onPress={unClaimRequest.run}
                isLoading={unClaimRequest.loading}
                isDisabled={content.state === ClaimService.ClaimState.Completed}
                bg="danger.500"
                leftIcon={<Icon
                  as={<MaterialCommunityIcons name="cancel" />}
                  size="sm"
                />}
              >
                Unclaim the wish
              </Button>
            </Row>
          </Center>
        </VStack>
      </Center>
    </Center>
  );
};

export default Index;
