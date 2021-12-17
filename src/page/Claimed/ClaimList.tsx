import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Center, HStack, Pressable, Text, VStack } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
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

  const renderHiddenItem: React.FC<{ item: IClaim }> = ({ item }) =>
    item.name ? (
      <HStack flex="1" pl="2">
        <VStack w="0" ml="auto" />
        <Pressable
          w="100"
          bg={item.state === ClaimService.ClaimState.Completed
            ? 'gray.500'
            : 'red.500'}
          _pressed={{
            opacity: 0.5,
          }}
          _disabled={{
            opacity: 0.5,
          }}
          onPress={async () => {
            await ClaimService.declaimWish(
              auth.user.uid, item.wisherID, item.wishID, item.claimID);
          }}
          disabled={item.state === ClaimService.ClaimState.Completed}
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
                Decline
              </Text>
            </VStack>
          </Center>
        </Pressable>
      </HStack>
    ) : null;

  return (
    <Box style={{ width: '100%', height: '100%' }} flex={1}>
      <SwipeListView
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
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewRowKey="0"
        previewOpenValue={-50}
        previewOpenDelay={3000}
        closeOnRowBeginSwipe
        disableRightSwipe
        closeOnRowOpen={false}
      />
    </Box>
  );
};

export default ClaimList;
