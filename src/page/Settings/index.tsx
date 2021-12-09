import React from 'react';
import { Button, Center } from 'native-base';
import { AuthService } from '../../service';

const Index: React.FC = () => (
  <Center flex={1}>
    <Button
      onPress={() => {
        AuthService.signOut();
      }}
    >
      Sign Out
    </Button>
  </Center>
);

export default Index;
