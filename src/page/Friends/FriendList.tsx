import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Box,
  Fab,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IFriend, FriendService } from '../../service/index';
import FriendCard from '../../component/FriendCard';

const userID = '1';

const Index: React.FC = () => {
  const [friendList, setFriendList] = useState<IFriend[]>([]);
  // const userID = AuthService.auth.currentUser?.uid || '';
  useEffect(() => {
    FriendService.onSnapshotUserFriend(userID, (qSnap: { docs: any[] }) => {
      const updateList: IFriend[] = [];
      qSnap.docs.forEach(async (doc: { data: () => any; id: any }) => {
        const friendItemTmp = doc.data();
        updateList.push(friendItemTmp as unknown as IFriend);
      });
      setFriendList(updateList);
    });
  }, []);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Friend List',
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

  const renderHiddenItem: React.FC<{item: IFriend}> = ({ item }) => (
    <HStack flex="1" pl="2">
      <VStack
        w="0"
        ml="auto"/>
      <Pressable
        w="100"
        bg="red.500"
        justifyContent="center"
        _pressed={{
          opacity: 0.5,
        }}
        onPress = {
          () => {
            FriendService.delete(item.ID, userID)
          }
        }
        >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialCommunityIcons name="delete" />} color="white" size="xs" />
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
        data={friendList}
        renderItem={({ item }) => (
          <FriendCard content={item} userID={userID} navigation={navigation} />
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewRowKey='0'
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={(rowKey) => {
          console.log('This row opened', rowKey);
        }}
      />
      <Fab
        size="sm"
        icon={<MaterialCommunityIcons name="plus" color="white" size={26} />}
        renderInPortal={false}
        onPress={() => {
          navigation.navigate(
            'AddFriend' as never,
            { content: null, mode: 'add' } as never,
          );
        }}
      />
    </Box>
  );
};

export default Index;
