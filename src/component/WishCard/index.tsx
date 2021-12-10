import React from 'react';
import { Box, Center, Column, Pressable, Row, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { IWish } from '../../service';
import ItemImage from './ItemImage';
import ClaimBadge from './ClaimBadge';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};

interface IProps {
  content: IWish;
  editable?: boolean;
  friendID: string;
}

const Index: React.FC<IProps> = ({ content, editable, friendID }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        // todo: really silly
        if (editable) {
          navigation.navigate('UpsertWish' as never, { content, mode: 'edit' } as never);
        } else {
          // Display
          navigation.navigate('FriendWish' as never, { content, friendID } as never);
        }
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
          <Row alignItems="center" space={4} py="10px" justifyContent="space-between" width="95%">
            <Column flex={0.6}>
              <ItemImage content={content} />
            </Column>
            <Column flex={2} alignItems="flex-start" space={2} justifyContent="center">
              <Text fontWeight="600" textAlign="left" {...textProps}>
                {content.name}
              </Text>
              <Text fontWeight="400" textAlign="left" {...textProps}>
                {`$${content.price}`}
              </Text>
            </Column>
            <Row flex={1} justifyContent="flex-end">
              <ClaimBadge content={content} />
            </Row>
          </Row>
        </Center>
      </Box>
    </Pressable>
  );
};

export default Index;
