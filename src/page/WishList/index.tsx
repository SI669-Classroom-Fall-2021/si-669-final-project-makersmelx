import React, { useEffect, useState } from 'react';
import { Box, Button, FlatList } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { IWish, WishService } from '../../service/index';
import WishCard from '../../component/WishCard';

const userID = '1';
const Index: React.FC = () => {
  const [wishList, setWishList] = useState<IWish[]>([]);
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
  return (
    <Box style={{ width: '80%', height: '100%' }}>
      <Button
        onPress={() => {
          navigation.navigate('UpsertWish' as never, { content: null, mode: 'add' } as never);
        }}
      >
        Add item
      </Button>
      <FlatList
        data={wishList}
        renderItem={({ item }) => <WishCard content={item} userID={userID} navigation={navigation} />}
      />
    </Box>
  );
};

export default Index;
