import React from 'react';
import {
  Box,
  Button,
  Center,
  Column,
  Heading,
  Image,
  Link,
  Text
} from 'native-base';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

const Index: React.FC = () => {
  const route = useRoute();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { content } = route.params;
  return (
    <Center flex={1}>
      <Box style={{ height: '100%', width: '90%' }}>
        <Column flex={1} space={8} justifyContent="center">
          <Heading size="lg" textAlign="left">
            {content.name}
          </Heading>
          <Text>{content.price}</Text>

          <Center flex={1}>
            <Image
              size="1000px"
              resizeMode="contain"
              source={{
                uri: content.image,
              }}
              borderRadius={6}
              alt="gift"
              fallbackElement={<MaterialCommunityIcons
                name="gift-outline"
                color="black"
                size={30}
              />}
            />
          </Center>

          <Heading size="md" textAlign="left">
            Description
          </Heading>
          <Text>{content.description}</Text>

          <Heading size="md" textAlign="left">
            Website Link
          </Heading>
          <Link href={content.url} isExternal>
            {content.url}
          </Link>

          <Button> Claim for him</Button>
        </Column>
      </Box>
    </Center>
  );
};

export default Index;
