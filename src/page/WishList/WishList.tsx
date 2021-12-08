import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Fab, FlatList, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service/index';
import WishCard from '../../component/WishCard';

const Index: React.FC = () => {
  const [wishList, setWishList] = useState<IWish[]>([]);
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

  return (
    <Box style={{ width: '100%', height: '100%' }} flex={1}>
      <FlatList
        data={wishList}
        renderItem={({ item }) => <WishCard
          content={item}
          userID={userID}
          navigation={navigation}
        />}
      />
      <Fab
        size="sm"
        icon={<MaterialCommunityIcons name="plus" color="white" size={26} />}
        renderInPortal={false}
        onPress={() => {
          navigation.navigate(
            'UpsertWish' as never, { content: null, mode: 'add' } as never);
        }}
      />
    </Box>
  );
};

export default Index;
