import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, FlatList, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase/compat';
import { IFriend, IWish, WishService } from '../../service';
import WishCard from '../WishCard';

interface IProps {
  friend: IFriend;
}

const Index: React.FC<IProps> = ({ friend }) => {
  const userID = friend.ID;
  const [wishList, setWishList] = useState<IWish[]>([]);
  const navigation = useNavigation();
  let unsubscription: firebase.Unsubscribe;
  useEffect(() => {
    if (userID) {
      if (unsubscription) {
        unsubscription();
      }
      unsubscription = WishService.onSnapshotUserWish(
        userID, (qSnap: { docs: any[] }) => {
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
  }, [userID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${friend.username}'s Wish List`,
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
        renderItem={({ item }) => <WishCard content={item} />}
      />
    </Box>
  );
};

export default Index;
