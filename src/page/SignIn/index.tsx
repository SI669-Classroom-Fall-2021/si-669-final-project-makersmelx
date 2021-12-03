import React, { useLayoutEffect } from 'react';
import {
  Box,
  Button,
  Center,
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
import { AuthService } from '../../service';

const Index: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const loginFailToast = 'login-fail-toast';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const { run, loading } = useRequest(
    async (value) => {
      await AuthService.signIn(value.email, value.password);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.navigate('Home' as never, {} as never);
      },
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
    <Center flex={1}>
      <Box safeArea width="90%">
        <Heading size="lg">Wishlist</Heading>
        <Box mt={8}>
          <Form
            space={6}
            submitButton={<Button _loading={loading}>Sign In</Button>}
            onFinish={run}
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
          <Row mt="8" justifyContent="center">
            <Text fontSize="sm">{"I'm a new user. "}</Text>
            <Link
              onPress={() => {
                navigation.navigate('SignUp' as never, {} as never);
              }}
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href="#"
            >
              Sign Up
            </Link>
          </Row>
        </Box>
      </Box>
    </Center>
  );
};

export default Index;
