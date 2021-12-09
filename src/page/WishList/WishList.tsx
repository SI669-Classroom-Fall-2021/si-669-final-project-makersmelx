import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Fab, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service/index';
import WishCard from '../../component/WishCard';

const Index: React.FC = () => {
  const [wishList, setWishList] = useState<IWish[]>([]);

  const swipeListRef = useRef(null);
  // const userID = AuthService.auth.currentUser?.uid || '';
  const userID = '1';
  useEffect(() => {
    WishService.onSnapshotUserWish(userID, (qSnap: { docs: any[] }) => {
      const updateList: IWish[] = [];
      qSnap.docs.forEach((doc: { data: () => any; id: any }) => {
        const wishItemTmp = doc.data();
        wishItemTmp.key = doc.id;
        updateList.push(wishItemTmp);
      });
      setWishList(updateList);
    });
  }, []);
  const navigation = useNavigation();
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

  const renderHiddenItem: React.FC<{ item: IWish }> = ({ item }) => (
    <HStack flex="1" pl="2">
      <VStack w="0" ml="auto" />
      <Pressable
        w="100"
        bg="red.500"
        justifyContent="center"
        _pressed={{
          opacity: 0.5,
        }}
        onPress={() => {
          WishService.delete(userID, item.key);
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<MaterialCommunityIcons name="delete" />}
            color="white"
            size="xs"
          />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box style={{ width: '100%', height: '100%' }} flex={1}>
      <SwipeListView
        data={wishList}
        renderItem={({ item }) => <WishCard content={item} />}
        ref={swipeListRef}
        keyExtractor={(item) => item.key}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewRowKey="0"
        previewOpenValue={-70}
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (swipeListRef && swipeListRef.current) {
            swipeListRef?.current?.closeAllOpenRows();
          }
          navigation.navigate(
            'UpsertWish' as never, { content: null, mode: 'add' } as never);
        }}
      />
    </Box>
  );
};

export default Index;
