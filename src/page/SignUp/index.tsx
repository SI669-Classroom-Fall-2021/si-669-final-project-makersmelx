import React from 'react';
import { Box, Center, Checkbox, Heading, Input } from 'native-base';
import Form, { FormItem } from '../../component/Form';

const Index: React.FC = () => (
  <Center flex={1}>
    <Box safeArea width="90%">
      <Heading>Sign Up</Heading>
      <Heading>Explain</Heading>
      <Form
        space={8}
        submitButton="Sign Up"
        onFinish={(value) => {
          console.log(value);
        }}
        onError={(error) => {
          console.error(error);
        }}
      >
        <FormItem
          name="username"
          label="Username"
          defaultValue=""
          rules={{
            required: 'Username is required',
          }}
          helperText={['1', '2', '3']}
        >
          <Input />
        </FormItem>
        <FormItem name="usernameTest" label="Username" defaultValue={false}>
          <Checkbox value="test" />
        </FormItem>
      </Form>
    </Box>
  </Center>
);

export default Index;
