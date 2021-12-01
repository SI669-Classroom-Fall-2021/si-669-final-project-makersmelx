import React from 'react';
import { Box, Button, Center, Column, FormControl, Heading, Input } from 'native-base';

const Index: React.FC = () => (
  <Center flex={1}>
    <Box safeArea w="90%">
      <Heading>Sign Up</Heading>
      <Heading>Explain</Heading>
      <Column>
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input />
        </FormControl>
        <Button>Sign Up</Button>
      </Column>
    </Box>
  </Center>
);

export default Index;
