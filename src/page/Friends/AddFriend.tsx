import React, { useLayoutEffect } from 'react';
import { Button, Center, Column, Heading, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import Form, { FormItem } from '../../component/Form';
import { FriendService } from '../../service';
import { useAuth } from '../../auth/AuthProvider';
import MaterialInput from '../../component/MaterialInput';

const AddFriend: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const loginFailToast = 'login-fail-toast';
  const auth = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
      title: 'Add a Friend',
    });
  }, [navigation]);
  const { run, loading } = useRequest(
    async (value) => {
      if (!auth.user) {
        throw new Error('Sign In to add friends');
      }
      const friendID = await auth.getUserIDByEmail(value.email);
      await FriendService.add(friendID, auth.user.uid);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.goBack();
      },
      onError: (error) => {
        toast.show({
          title: error.message,
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
      <Column
        safeArea
        width="100%"
        alignItems="center"
        justifyContent="center"
        space={16}
      >
        <Heading size="lg">Find your friends by email</Heading>
        <Form
          space={6}
          submitButton={<Button isLoading={loading}>Add Friend</Button>}
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
            <MaterialInput iconName="email" />
          </FormItem>
        </Form>
      </Column>
    </Center>
  );
};

export default AddFriend;
