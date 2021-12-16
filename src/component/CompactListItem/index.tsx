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
      _dark={{
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
        <Box>
          <Row alignItems="center" space={2} justifyContent="flex-start" flex={1} height="100%" width="100%">
            <Column pl={2} py={2}>{avatar}</Column>
            <Row
              alignItems="center"
              space={2}
              justifyContent="flex-start"
              flex={1}
              height="100%"
              width="100%"
              borderColor="gray.300"
              borderBottomWidth="1"
            >
              <Row
                alignItems="center"
                space={2}
                justifyContent="flex-start"
                flex={1}
                height="100%"
                width="100%"
                py={2}
                pr={2}
              >
                <Column flex={1} height="100%" width="100%">
                  {content}
                </Column>
                <Column alignItems="flex-end" marginLeft="auto" height="100%">
                  {extra}
                </Column>
              </Row>
            </Row>
          </Row>
        </Box>
      </Center>
    </Box>
  </Pressable>
);

export default Index;
