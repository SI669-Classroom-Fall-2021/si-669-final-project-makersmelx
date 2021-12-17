import React from 'react';
import { Icon, Text } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IClaim, ClaimService } from '../../service';

interface IProps {
  content: IClaim;
}

const Index: React.FC<IProps> = ({ content }) => {
  const iconProps = {
    [ClaimService.ClaimState.Default]: {
      color: 'success.500',
      as: <MaterialCommunityIcons name="check">
        Claimed
      </MaterialCommunityIcons>
    },
    [ClaimService.ClaimState.Completed]: {
      color: 'gray.400',
      as: <MaterialCommunityIcons name="gift-outline">
        {' '}
        Completed
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
