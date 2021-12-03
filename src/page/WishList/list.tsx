import React, { useState, useEffect } from 'react';
import { Box, Text, HStack, Stack, FlatList, Avatar, Button, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { WishService, IWish } from '../../service/index';

const WishCard: React.FC<{ content: IWish, userID: string, navigation: any }> = ({ content, userID, navigation }) => (
  <Pressable onPress={()=>{
      navigation.navigate('Edit' as never, {content, mode: "edit" } as never);
  }}>
  <Box
    w = "100%"
    rounded="lg"
    overflow="hidden"
    borderColor="coolGray.200"
    borderWidth="1"
    _dark={{
      borderColor: 'coolGray.600',
      backgroundColor: 'gray.700',
    }}
    _web={{
      shadow: 2,
      borderWidth: 0,
    }}
    _light={{
      backgroundColor: 'gray.50',
    }}
  >
    <HStack alignItems="center" space={4} py="10px" justifyContent="space-around">
      {/* <Stack>
          <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
        </Stack> */}
      <Stack>
        <Avatar
          size="lg"
          source={{
            uri: content.image,
          }}
        />
      </Stack>
      <Stack>
        <Text
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="400"
        >
          {content.name}
        </Text>
        <Text
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="400"
        >
          {content.price}
        </Text>
      </Stack>
      <Stack>
        <Text
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="400"
        >
          {(()=>{
            switch(content.state){
              case WishService.WishState.Claimed: {
                return <Button size="md" w="80px" isDisabled >Claimed</Button>
              }
              case WishService.WishState.Completed: {
                return <Button size="md" w="80px" isDisabled >Completed</Button>
              }
              default: {
                return <Button size="md" w="80px" onPress={() => {WishService.delete(userID, content.key)}}>Delete</Button>
              }
            }    
          })()}
        </Text>
      </Stack>
    </HStack>
  </Box>
  </Pressable>
  );

const userID = "1"
const List: React.FC = () => {
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
  return(
    <Box style={{width: '80%',height: '100%'}}>
      <Button 
      onPress={()=>{
        navigation.navigate('Edit' as never, {content: null, mode: "add" } as never);
  }}>Add item</Button>
    <FlatList  data={wishList} renderItem={({ item }) => <WishCard content={item} userID = {userID} navigation ={navigation} />} />;
  </Box>
  )
  
};


export default List;
