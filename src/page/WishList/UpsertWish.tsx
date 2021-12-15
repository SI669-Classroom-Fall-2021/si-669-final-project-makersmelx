import React, { useLayoutEffect } from 'react';
import { Box, Button, Center, Input, TextArea, useToast } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Form, { FormItem } from '../../component/Form';
import { IWish, WishService } from '../../service';
import { useAuth } from '../../auth/AuthProvider';
import { WishParamList } from './WishParamList';

type UpsertRouteProp = RouteProp<WishParamList, 'UpsertWish'>;

const Index: React.FC = () => {
  const route = useRoute<UpsertRouteProp>();
  const navigation = useNavigation();
  const content = route.params?.content;
  const mode = route.params?.mode;
  const toast = useToast();
  const formFailToast = 'form-fail-toast';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
    });
  });
  const auth = useAuth();
  const { run, loading } = useRequest(
    async (value: any) => {
      if (!auth.user) {
        throw new Error('Sign in to view the wish');
      }
      if (!content) {
        throw new Error('Error loading the wish');
      }
      if (mode === 'edit') {
        const newContent = {
          ...content,
          ...value,
        } as IWish;
        await WishService.update(newContent, auth.user.uid, content.key);
      } else {
        const newContent = {
          name: value.name || '',
          url: value.url || '',
          description: value.description || '',
          image: value.image || '',
          price: value.price || '0',
          createdAt: new Date(),
          state: WishService.WishState.Default,
          key: uuidv4(),
        } as IWish;
        await WishService.add(newContent, auth.user.uid || '');
      }
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
          id: formFailToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );
  const onFinish = async (value: any) => {
    await run(value);
  };
  const submitButton = <Button isLoading={loading}>{mode === 'edit' ? 'Update Item' : 'Add to Wishlist'}</Button>;
  return (
    <Center flex={1}>
      <Box safeArea flex={1} width="90%">
        <Form space={8} submitButton={submitButton} onFinish={onFinish}>
          <FormItem name="name" label="Name" defaultValue={content?.name} rules={{ required: 'Gift Name is required' }}>
            <Input />
          </FormItem>
          <FormItem name="url" label="Url" defaultValue={content?.url}>
            <Input />
          </FormItem>
          <FormItem
            name="price"
            label="Price"
            defaultValue={content?.price}
            rules={{
              pattern: {
                value: /^\d+$/g,
                message: 'Price must be numbers',
              },
            }}
          >
            <Input />
          </FormItem>
          <FormItem name="image" label="Image" defaultValue={content?.image}>
            <Input />
          </FormItem>
          <FormItem name="description" label="Description" defaultValue={content?.description}>
            <TextArea />
          </FormItem>
        </Form>
      </Box>
    </Center>
  );
};

export default Index;
