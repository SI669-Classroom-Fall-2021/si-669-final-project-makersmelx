import React from 'react';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  Text
} from 'native-base';
import { IWish, WishService } from '../../service';

const Index: React.FC<{ content: IWish; userID: string; navigation: any }> = ({
  content,
  userID,
  navigation
}) => (
  <Pressable
    onPress={() => {
      navigation.navigate(
        'UpsertWish' as never, { content, mode: 'edit' } as never);
    }}
  >
    <Box
      w="100%"
      rounded="lg"
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
        backgroundColor: 'gray.50',
      }}
    >
      <HStack
        alignItems="center"
        space={4}
        py="10px"
        justifyContent="space-around"
      >
        {/* <Stack>
          <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
        </Stack> */}
        <Stack>
          <Avatar
            size="lg"
            source={{
              uri: content.image,
            }}
          />
        </Stack>
        <Stack>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="400"
          >
            {content.name}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="400"
          >
            {content.price}
          </Text>
        </Stack>
        <Stack>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="400"
          >
            {(() => {
              switch (content.state) {
                case WishService.WishState.Claimed: {
                  return (
                    <Button size="md" w="80px" isDisabled>
                      Claimed
                    </Button>
                  );
                }
                case WishService.WishState.Completed: {
                  return (
                    <Button size="md" w="80px" isDisabled>
                      Completed
                    </Button>
                  );
                }
                default: {
                  return (
                    <Button
                      size="md"
                      w="80px"
                      onPress={() => {
                        WishService.delete(userID, content.key);
                      }}
                    >
                      Delete
                    </Button>
                  );
                }
              }
            })()}
          </Text>
        </Stack>
      </HStack>
    </Box>
  </Pressable>
);

export default Index;
