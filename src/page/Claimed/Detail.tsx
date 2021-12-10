import React, { useEffect, useState } from 'react';
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
  useToast,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequest } from 'ahooks';
import { getDoc } from 'firebase/firestore';
import {
  AuthService,
  ClaimService,
  IWish,
  WishService,
  IClaim,
} from '../../service';

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
      if (AuthService.auth.currentUser) {
        const wishRef = WishService.getWishRef(content.wisher, content.wishID);
        const wishSnap = await getDoc(wishRef);
        const wishInfoTmp = wishSnap.data();
        if(wishInfoTmp){
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
        
      }
    })();
  }, []);
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
                <Text>{wishInfo.description}</Text>
              </ScrollView>
            </Box>
            <Box
              bg="primary.100"
              marginY="3"
              borderRadius={10}
              paddingX={5}
              paddingY={3}
            >
              <Link href={wishInfo.url} isExternal>
                {wishInfo.url}
              </Link>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default Index;
