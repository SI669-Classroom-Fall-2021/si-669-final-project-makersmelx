import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat';
import { Box, FlatList, Pressable } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service';
import WishCard from '../../component/WishCard';

const Index: React.FC = () => {
  const route = useRoute();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { content } = route.params;
  const userID = content.ID;
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
      title: `${content.username}'s Wish List`,
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
        renderItem={({ item }) => (
          <WishCard
            content={item}
            onNavigate={() => {
              navigation.navigate(
                'FriendWish' as never,
                { content: item, friendID: content.id } as never
              );
            }}
          />
        )}
      />
    </Box>
  );
};

export default Index;
