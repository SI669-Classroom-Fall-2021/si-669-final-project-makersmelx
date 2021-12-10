import React from 'react';
import { Text, useTheme } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service';

interface IProps {
  content: IWish;
}

const Index: React.FC<IProps> = ({ content }) => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const primaryColor = theme.colors.primary['500'] || 'black';
  switch (content.state) {
    case WishService.WishState.Claimed: {
      return (
        <Text textAlign="left">
          <MaterialCommunityIcons name="check" color="green" size={16}>
            Claimed
          </MaterialCommunityIcons>
        </Text>
      );
    }
    case WishService.WishState.Completed: {
      return (
        <Text textAlign="right">
          <MaterialCommunityIcons name="gift-outline" color="gray" size={16}>
            Completed
          </MaterialCommunityIcons>
        </Text>
      );
    }
    case WishService.WishState.Default:
    default: {
      return (
        <Text textAlign="right">
          <MaterialCommunityIcons
            name="dots-horizontal"
            color={primaryColor}
            size={16}
          >
            {' '}
            Not Yet
          </MaterialCommunityIcons>
        </Text>
      );
    }
  }
};

export default Index;
