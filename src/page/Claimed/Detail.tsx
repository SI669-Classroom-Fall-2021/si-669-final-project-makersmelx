import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  ScrollView,
  Text,
  VStack
} from 'native-base';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDoc } from 'firebase/firestore';
import { IClaim, IWish, WishService } from '../../service';

const Index: React.FC = () => {
  const route = useRoute();

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
      <Center style={{ height: '100%', width: '100%' }} bg="white">
        <VStack style={{ height: '100%', width: '90%' }}>
          <HStack
            flex={0.5}
            justifyContent="space-between"
            alignItems="center"
            mt={6}
          >
            <Heading size="lg" textAlign="left" padding={3}>
              {wishInfo.name}
            </Heading>
            <Text fontSize="lg" padding={3}>{`$${wishInfo.price}`}</Text>
          </HStack>

          <Center flex={3} marginBottom={3} h="30%">
            <Image
              size="100%"
              resizeMode="cover"
              mt={6}
              source={{
                uri: wishInfo.image,
              }}
              alt="gift"
              borderRadius={6}
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
            <Box bg="white" paddingX={5} paddingY={3} mt={2}>
              <ScrollView>
                <Text>{wishInfo.description}</Text>
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
              {wishInfo.url ? (
                <Link
                  href={wishInfo.url}
                  isExternal
                  _text={{
                    _light: {
                      color: 'cyan.500',
                    },
                    color: 'cyan.300',
                  }}
                  isUnderlined
                >
                  Tap to view in the website
                </Link>
              ) : (
                <Text>No link</Text>
              )}
            </Box>
          </Box>
        </VStack>
      </Center>
    </Center>
  );
};

export default Index;
