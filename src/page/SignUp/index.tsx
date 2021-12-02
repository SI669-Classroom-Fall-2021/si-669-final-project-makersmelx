import React from 'react';
import { Box, Center, Heading, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Form, { FormItem } from '../../component/Form';
import PasswordInput from '../../component/PasswordInput';
import { AuthService } from '../../service';

const Index: React.FC = () => {
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigation = useNavigation();
  const onFinish = async (value: any) => {
    // todo: update phone number
    await AuthService.signUp(value.email, value.password, value.username);
    // todo: add loading here
    navigation.navigate('Home' as never, {} as never);
  };
  return (
    <Center flex={1}>
      <Box safeArea width="90%">
        <Heading size="lg">Sign Up</Heading>
        <Box mt={8}>
          <Form
            space={6}
            submitButton="Sign Up"
            onFinish={onFinish}
            onError={(error) => {
              // todo: add message here
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
            >
              <Input />
            </FormItem>
            <FormItem
              name="email"
              label="Email"
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email',
                },
              }}
            >
              <Input />
            </FormItem>
            <FormItem
              name="phoneNumber"
              label="Phone Number"
              defaultValue=""
              rules={{
                required: 'Phone Number is required',
                pattern: {
                  value: /^\d+$/g,
                  message: 'Invalid phone number',
                },
              }}
            >
              <Input />
            </FormItem>
            <FormItem
              name="password"
              label="Password"
              defaultValue=""
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should contain at least eight characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                  message: 'Password should contain at least one upper case letter, lower case letter and number',
                },
              }}
              helperText={[
                'At least eight characters',
                'At least one upper case letter, lower case letter and number']}
            >
              <PasswordInput ref={passwordRef} />
            </FormItem>
            <FormItem
              name="confirmPassword"
              label="Confirm Password"
              defaultValue=""
              rules={{
                required: 'Confirm Password is required',
                validate: (value) => value === passwordRef?.current?.value
                  || 'Password does not match',
              }}
            >
              <PasswordInput />
            </FormItem>
          </Form>
        </Box>
      </Box>
    </Center>
  );
};

export default Index;
