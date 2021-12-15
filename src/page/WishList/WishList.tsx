import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Center, Fab, HStack, Pressable, Text, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase/compat';
import { IWish, WishService } from '../../service';
import WishCard from '../../component/WishCard';
import { useAuth } from '../../auth/AuthProvider';

const Index: React.FC = () => {
  const [wishList, setWishList] = useState<IWish[]>([]);
  const swipeListRef = useRef(null);
  const navigation = useNavigation();
  const auth = useAuth();
  let unsubscription: firebase.Unsubscribe;
  useEffect(() => {
    if (auth.user) {
      if (unsubscription) {
        unsubscription();
      }
      unsubscription = WishService.onSnapshotUserWish(
        auth.user.uid, (qSnap: { docs: any[] }) => {
          const updateList: IWish[] = [];
          qSnap.docs.forEach((doc: { data: () => any; id: any }) => {
            const wishItemTmp = doc.data();
            if (!wishItemTmp.name) {
              return;
            }
            wishItemTmp.key = doc.id;
            updateList.push(wishItemTmp);
          });
          setWishList(updateList);
        });
    }
    return unsubscription;
  }, [auth.user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Wish List',
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

  const renderHiddenItem: React.FC<{ item: IWish }> = ({ item }) =>
    item.name ? (
      <HStack flex="1" pl="2">
        <VStack w="0" ml="auto" />
        <Pressable
          w="100"
          bg="red.500"
          _pressed={{
            opacity: 0.5,
          }}
          onPress={async () => {
            await WishService.delete(auth.user.uid, item.key);
          }}
        >
          <Center flex={1}>
            <VStack alignItems="center">
              <MaterialCommunityIcons name="delete" color="white" size={30} />
              <Text
                color="white"
                fontSize={16}
                fontWeight="medium"
                textAlign="center"
              >
                Delete
              </Text>
            </VStack>
          </Center>
        </Pressable>
      </HStack>
    ) : null;

  return (
    <Box style={{ width: '100%', height: '100%' }} flex={1}>
      <SwipeListView
        data={wishList}
        renderItem={({ item }) => (item.name ? <WishCard
          content={item}
          friendID={auth.user.uid}
          editable
        /> : null)}
        ref={swipeListRef}
        keyExtractor={(item) => item.key}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewRowKey="0"
        previewOpenValue={-50}
        previewOpenDelay={3000}
        closeOnRowBeginSwipe
        disableRightSwipe
        closeOnRowOpen={false}
      />
      <Fab
        size="sm"
        icon={<MaterialCommunityIcons name="plus" color="white" size={26} />}
        renderInPortal={false}
        onPress={() => {
          if (swipeListRef && swipeListRef.current) {
            (swipeListRef?.current as any).closeAllOpenRows();
          }
          navigation.navigate(
            'UpsertWish' as never, { content: null, mode: 'create' } as never);
        }}
      />
    </Box>
  );
};

export default Index;
