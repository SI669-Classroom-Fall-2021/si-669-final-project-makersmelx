import React from 'react';
import {
  Box,
  Center,
  Column,
  Pressable,
  Row,
  Text,
} from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IFriend, FriendService } from '../../service';
import ItemImage from './ItemImage';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};
const Index: React.FC<{ content: IFriend; userID: string; navigation: any }> = ({
  content,
  userID,
  navigation
}) => (
    <Pressable
      onPress={() => {
        // navigation.navigate(
        //   'UpsertWish' as never, { content, mode: 'edit' } as never);
      }}
    >
      <Box
        width="100%"
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
          backgroundColor: 'white',
        }}
      >
        <Center flex={1}>
          <Row
            alignItems="center"
            space={4}
            py="10px"
            justifyContent="space-between"
            width="95%"
          >
            <Column flex={0.6}>
              <ItemImage image={content.image} />
            </Column>
            <Column
              flex={2}
              alignItems="flex-start"
              space={2}
              justifyContent="center"
            >
              <Text fontWeight="600" textAlign="left" {...textProps}>
                {content.name}
              </Text>
            </Column>
          </Row>
        </Center>
      </Box>
    </Pressable>
  );

export default Index;