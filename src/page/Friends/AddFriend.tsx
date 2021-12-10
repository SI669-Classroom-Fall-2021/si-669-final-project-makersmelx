import React, { useLayoutEffect } from 'react';
import { Box, Button, Center, Heading, Input, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import Form, { FormItem } from '../../component/Form';
import { AuthService, FriendService } from '../../service';

const AddFriend: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const loginFailToast = 'login-fail-toast';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
      title: 'Add a Friend',
    });
  }, [navigation]);
  const { run, loading } = useRequest(
    async (value) => {
      const userID = AuthService.auth?.currentUser?.uid || '';
      const friendID = await AuthService.getUserIDByEmail(value.email);
      await FriendService.add(friendID, userID);
    },
    {
      manual: true,
      onSuccess: () => {
        navigation.goBack();
      },
      onError: () => {
        toast.show({
          title: 'User not found',
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
