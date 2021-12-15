import React, { useLayoutEffect } from 'react';
import { Box, Button, Center, Heading, Input, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import Form, { FormItem } from '../../component/Form';
import { FriendService } from '../../service';
import { useAuth } from '../../auth/AuthProvider';

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
      <Box safeArea width="90%">
        <Heading size="lg">Friend List</Heading>
        <Box>
          <Form
            space={6}
            submitButton={<Button isLoading={loading}>Add Friend</Button>}
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
          </Form>
        </Box>
      </Box>
    </Center>
  );
};

export default AddFriend;
