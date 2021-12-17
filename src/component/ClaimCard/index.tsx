import React from 'react';
import { Box, Button, Center, Column, Pressable, Row, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ClaimService, IClaim } from '../../service';
import ItemImage from './ItemImage';

const textProps = {
  color: 'coolGray.600',
  _dark: {
    color: 'warmGray.200',
  },
};
const Index: React.FC<{ content: IClaim; userID: string }> = ({ content, userID }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('FriendWish' as never, { content } as never);
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
              <ItemImage url={content.image} />
            </Column>
            <Column flex={2} alignItems="flex-start" space={2} justifyContent="center">
              <Text fontWeight="600" textAlign="left" {...textProps}>
                {content.name}
              </Text>
              <Text fontWeight="400" textAlign="left" {...textProps}>
                {content.price}
              </Text>
              <Text fontWeight="400" textAlign="left" {...textProps}>
                {`${content.claimedAt.toDate().toLocaleDateString('en-US')} ${content.claimedAt
                  .toDate()
                  .toLocaleTimeString('en-US')}`}
              </Text>
            </Column>
            <Row flex={1} justifyContent="flex-end">
              <Button
                onPress={() => {
                  ClaimService.completeClaim(userID, content.wisherID, content.wishID, content.claimID);
                }}
                isDisabled={content.state === ClaimService.ClaimState.Completed}
              >
                Sent!
              </Button>
            </Row>
          </Row>
        </Center>
      </Box>
    </Pressable>
  );
};

export default Index;
