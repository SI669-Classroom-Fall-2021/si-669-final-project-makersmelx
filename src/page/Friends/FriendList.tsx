import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Center, Fab, HStack, Pressable, Text, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthService, FriendService, IFriend } from '../../service';
import FriendCard from './FriendCard';

const Index: React.FC = () => {
  const [friendList, setFriendList] = useState<IFriend[]>([]);
  const [userID, setUserID] = useState('');
  useEffect(() => {
    AuthService.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
  }, []);
  let unsubscribe: any;
  useEffect(() => {
    if (userID) {
      if (unsubscribe) {
        unsubscribe();
      }
      unsubscribe = FriendService.onSnapshotUserFriend(
        userID, (qSnap: { docs: any[] }) => {
          const updateList: IFriend[] = [];
          qSnap.docs.forEach(async (doc: { data: () => any; id: any }) => {
            const friendItemTmp = doc.data();
            if (!friendItemTmp.email) {
              return;
            }
            updateList.push(friendItemTmp as IFriend);
          });
          setFriendList(updateList);
        });
    }
    return unsubscribe;
  }, [userID]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Friends',
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

  const renderHiddenItem: React.FC<{ item: IFriend }> = ({ item }) =>
    item.email ? (
      <HStack flex="1" pl="2">
        <VStack w="0" ml="auto" />
        <Pressable
          w="100"
          bg="red.500"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}
          onPress={async () => {
            await FriendService.delete(item.ID, userID);
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

  const swipeListRef = useRef(null);

  return (
    <Box style={{ width: '100%', height: '100%' }} flex={1}>
      <SwipeListView
        data={friendList}
        renderItem={({ item }) => (item.email
          ? <FriendCard content={item} />
          : null)}
        ref={swipeListRef}
        keyExtractor={(item) => item.email}
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
          if (swipeListRef && swipeListRef.current) {
            (swipeListRef?.current as any).closeAllOpenRows();
          }
          navigation.navigate(
            'AddFriend' as never, { content: null, mode: 'add' } as never);
        }}
      />
    </Box>
  );
};

export default Index;
