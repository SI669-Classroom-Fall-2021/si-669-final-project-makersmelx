import React from 'react';
import { Box, Center, Column, Pressable, Row, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { IFriend } from '../../../service';
import ItemImage from './ItemImage';
import { gravatarUrl } from '../../../utils';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};
const Index: React.FC<{ content: IFriend }> = ({ content }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('FriendWishList' as never, { content } as never);
  };
  return (
    <Pressable onPress={onPress}>
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
          <Row alignItems="center" space={4} py="10px" justifyContent="space-between" width="95%">
            <Column flex={0.6}>
              <ItemImage image={gravatarUrl(content.gravatar)} />
            </Column>
            <Column flex={2} alignItems="flex-start" space={2} justifyContent="center">
              <Text fontWeight="600" textAlign="left" {...textProps}>
                {content.username}
              </Text>
            </Column>
            <Row flex={1} justifyContent="flex-end" />
          </Row>
        </Center>
      </Box>
    </Pressable>
  );
};

export default Index;
