import React from 'react';
import { Button, Center } from 'native-base';

const Index: React.FC = () => (
  <Center flex={1}>
    <Button
      onPress={() => {
        console.log('test')
      }}
    >
      Sign Out
    </Button>
  </Center>
);

export default Index;
