import React from 'react';
import { Icon, Text } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service';

interface IProps {
  content: IWish;
}

const Index: React.FC<IProps> = ({ content }) => {
  const iconProps = {
    [WishService.WishState.Claimed]: {
      color: 'success.500',
      as: <MaterialCommunityIcons name="check">
        Claimed
      </MaterialCommunityIcons>
    },
    [WishService.WishState.Completed]: {
      color: 'gray.400',
      as: <MaterialCommunityIcons name="gift-outline">
        {' '}
        Completed
      </MaterialCommunityIcons>
    },
    [WishService.WishState.Default]: {
      color: 'primary.500',
      as: <MaterialCommunityIcons
        name="dots-horizontal"
      >
        {' '}
        Not Yet
      </MaterialCommunityIcons>
    }
  }
  return (
    <Text textAlign="left">
      <Icon
        size='14px'
        color={iconProps[content.state].color}
        as={iconProps[content.state].as}
      />
    </Text>

  )
};

export default Index;
