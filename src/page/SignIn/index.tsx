import React, { useLayoutEffect } from 'react';
import {
  Button,
  Center,
  Column,
  Heading,
  Input,
  Link,
  Row,
  Text,
  useToast
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import Form, { FormItem } from '../../component/Form';
import PasswordInput from '../../component/PasswordInput';
import { useAuth } from '../../auth/AuthProvider';

const Index: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const loginFailToast = 'login-fail-toast';
  const auth = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const { run, loading } = useRequest(
    async (value) => {
      await auth.signIn(value.email, value.password);
    },
    {
      manual: true,
      onError: () => {
        toast.show({
          title: 'Password does not match',
          status: 'error',
          id: loginFailToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );
  return (
    <Center flex={1} bg="white">
      <Column safeArea width="90%" space={8} alignItems="center">
        <Heading size="lg">Wishlist</Heading>
        <Form
          space={6}
          submitButton={<Button isLoading={loading}>Sign In</Button>}
          onFinish={run}
          width="90%"
        >
          <FormItem
            name="email"
            label="Email"
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email',
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
            }}
          >
            <PasswordInput />
          </FormItem>
        </Form>
        <Row justifyContent="center">
          <Text fontSize="sm">{"I'm a new user. "}</Text>
          <Link
            onPress={() => {
              navigation.navigate('SignUp' as never, {} as never);
            }}
            _text={{
              color: 'primary.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
          >
            Sign Up
          </Link>
        </Row>
      </Column>
    </Center>
  );
};

export default Index;
