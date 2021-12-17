import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, FlatList, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase/compat';
import { ClaimService, IClaim } from '../../service';
import ClaimCard from '../../component/ClaimCard';
import { useAuth } from '../../auth/AuthProvider';

const ClaimList: React.FC = () => {
  const [claimList, setClaimList] = useState<IClaim[]>([]);
  const swipeListRef = useRef(null);
  const navigation = useNavigation();

  let unsubscription: firebase.Unsubscribe;
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      if (unsubscription) {
        unsubscription();
      }
      unsubscription = ClaimService.onSnapshotUserClaim(
        auth.user.uid, (qSnap: { docs: any[] }) => {
          const updateList: IClaim[] = [];
          qSnap.docs.forEach((doc: { data: () => any; id: any }) => {
            const claimItemTmp = doc.data();
            if (!claimItemTmp.name) {
              return;
            }
            claimItemTmp.key = doc.id;
            updateList.push(claimItemTmp);
          });
          setClaimList(updateList);
        });
    }
    return unsubscription;
  }, [auth.user.uid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Claim List',
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
        data={claimList}
        renderItem={({ item }) => (item.name ? <ClaimCard
          content={item}
          onNavigate={() => {
            navigation.navigate(
              'ClaimedFriendWish' as never,
              { content: item, userID : auth.user.uid } as never
            );
          }}
        /> : null)}
        ref={swipeListRef}
        keyExtractor={(item) => item.claimID}
      />
    </Box>
  );
};

export default ClaimList;
