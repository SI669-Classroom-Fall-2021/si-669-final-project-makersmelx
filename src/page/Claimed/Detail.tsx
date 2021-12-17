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
  Text,
  VStack
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getDoc } from 'firebase/firestore';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IClaim, IWish, WishService } from '../../service';
import LoadingImageBackground from '../../component/LoadingImageBackground';

const Index: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { content }: { content: IClaim } = route.params;
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
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Claimed ${content.name}`,
    });
  });
  useEffect(() => {
    (async () => {
      const wishRef = WishService.getWishRef(content.wisher, content.wishID);
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
    })();
  }, []);
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
                  {`${content.wisher} has not provided a link yet`}
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
                leftIcon={<Icon
                  as={<MaterialCommunityIcons name="gift" />} size="sm"
                />}
              >
                I&apos;ve sent the gift
              </Button>
              <Button
                bg="danger.500"
                leftIcon={<Icon
                  as={<MaterialCommunityIcons name="cancel" />} size="sm"
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
