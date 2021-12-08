import React from 'react';
import {
  Box,
  Center,
  Column,
  Pressable,
  Row,
  Text,
  useTheme
} from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service';
import ItemImage from './ItemImage';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};
const Index: React.FC<{ content: IWish; userID: string; navigation: any }> = ({
  content,
  userID,
  navigation
}) => {
  const theme = useTheme();
  const claimedBadge = () => {
    switch (content.state) {
      case WishService.WishState.Claimed: {
        return (
          <Text textAlign="left">
            <MaterialCommunityIcons
              name="check"
              color="green"
              size={16}
            > Claimed</MaterialCommunityIcons>
          </Text>
        );
      }
      case WishService.WishState.Completed: {
        return (
          <Text textAlign="right">
            <MaterialCommunityIcons
              name="gift-open"
              color="gray"
              size={16}
            > Completed</MaterialCommunityIcons>
          </Text>
        );
      }
      case WishService.WishState.Default:
      default: {
        return (
          <Text textAlign="right">
            <MaterialCommunityIcons
              name="dots-horizontal"
              color={theme.colors.primary['500']}
              size={16}
            > Not Yet</MaterialCommunityIcons>
          </Text>
        );
      }
    }
  };
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(
          'UpsertWish' as never, { content, mode: 'edit' } as never);
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
              <ItemImage content={content} />
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
              <Text fontWeight="400" textAlign="left" {...textProps}>
                {`$${content.price}`}
              </Text>
            </Column>
            <Row flex={1} justifyContent="flex-end">
              {claimedBadge()}
            </Row>
          </Row>
        </Center>
      </Box>
    </Pressable>
  );
};

export default Index;
