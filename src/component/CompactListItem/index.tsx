import React, { ReactElement } from 'react';
import { Box, Center, Column, Pressable, Row } from 'native-base';

interface IProps {
  avatar?: ReactElement | null | undefined;
  content?: ReactElement | null | undefined;
  extra?: ReactElement | null | undefined;
  onPress?: () => void;
}

const Index: React.FC<IProps> = ({ onPress, avatar, content, extra }) => (
  <Pressable onPress={onPress}>
    <Box
      width="100%"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="0.5"
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
        <Box width="95%" py={2}>
          <Row alignItems="center" space={4} justifyContent="flex-start" flex={1}>
            <Column>{avatar}</Column>
            <Column flex={1} height="100%" width="100%">
              {content}
            </Column>
            <Column alignItems="flex-end" marginLeft="auto" height="100%">
              {extra}
            </Column>
          </Row>
        </Box>
      </Center>
    </Box>
  </Pressable>
);

export default Index;
