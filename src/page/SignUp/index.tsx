import React, { useState } from 'react';
import { Button, Column, Input, useToast } from 'native-base';
import { useRequest } from 'ahooks';
import Form, { FormItem } from '../../component/Form';
import PasswordInput from '../../component/PasswordInput';
import MaterialInput from '../../component/MaterialInput';
import { useAuth } from '../../auth/AuthProvider';

const Index: React.FC = () => {
  const [password, setPassword] = useState('');
  const toast = useToast();
  const signUpErrorToast = 'signup-fail-toast';
  const auth = useAuth();
  const { run: onFinish, loading } = useRequest(
    async (value: any) => {
      // todo: update phone number
      await auth.signUp(value.email, value.password, value.username);
    },
    {
      manual: true,
      onError: (error) => {
        toast.show({
          title: error.message,
          status: 'error',
          id: signUpErrorToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );
  return (
    <Column
      justifyContent="flex-start"
      alignItems="center"
      height="100%"
      bg="white"
      safeArea
    >
      <Form
        space={6}
        submitButton={<Button isLoading={loading}>Sign Up</Button>}
        onFinish={onFinish}
        width="90%"
        height="100%"
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
          <MaterialInput iconName="email" />
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
            validate: {
              setPassword: (value) => {
                setPassword(value);
                return true;
              },
            },
          }}
          helperText={[
            'At least eight characters',
            'At least one upper case letter, lower case letter and number']}
        >
          <PasswordInput />
        </FormItem>
        <FormItem
          name="confirmPassword"
          label="Confirm Password"
          defaultValue=""
          rules={{
            required: 'Confirm Password is required',
            validate: (value) => value === password
              || 'Password does not match',
          }}
        >
          <PasswordInput />
        </FormItem>
        <FormItem
          name="username"
          label="Username"
          defaultValue=""
          rules={{
            required: 'Username is required',
          }}
        >
          <MaterialInput iconName="account" />
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
          <MaterialInput iconName="phone" />
        </FormItem>
      </Form>
    </Column>
  );
};

export default Index;
