import React, { useLayoutEffect, useState } from 'react';
import {
  Box,
  Button,
  Column,
  ScrollView,
  Text,
  TextArea,
  useToast
} from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import Form, { FormItem } from '../../component/Form';
import { IWish, PhotoService, WishService } from '../../service';
import MaterialInput from '../../component/MaterialInput';
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
  const [image, setImage] = useState(content?.image || '');
  const auth = useAuth();
  const isEdit = mode === 'edit';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Wish list',
      title: isEdit ? `Edit my wish` : 'Make a new Wish',
    });
  });

  const { run: uploadImage, loading: uploadingImage } = useRequest(
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          throw new Error(
            'We need your camera permission to upload your photos');
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });

      if (!result.cancelled) {
        const newUri = await PhotoService.savePicture(
          auth.user.uid || 'Guest', result);
        setImage(newUri);
      }
    },
    {
      manual: true,
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

  const { run, loading } = useRequest(
    async (value: any) => {
      if (!auth.user) {
        throw new Error('Sign in to view the wish');
      }
      if (mode === 'edit') {
        if (!content) {
          throw new Error('Error loading the wish');
        }
        const newContent = {
          ...content,
          ...value,
        } as IWish;
        newContent.image = image;
        await WishService.update(newContent, auth.user.uid, content.key);
      } else {
        const newContent = {
          name: value.name || '',
          url: value.url || '',
          description: value.description || '',
          image: image || '',
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

  const submitButton = <Button isLoading={loading}>{mode === 'edit'
    ? 'Update Item'
    : 'Add to Wishlist'}</Button>;

  return (
    <Box bg="white">
      <ScrollView>
        <Column
          safeArea
          justifyContent="flex-start"
          alignItems="center"
        >
          <Form
            space={6}
            submitButton={submitButton}
            onFinish={onFinish}
            width="90%"
          >
            <FormItem
              name="name"
              label="Name"
              defaultValue={content?.name}
              rules={{ required: 'Gift Name is required' }}
            >
              <MaterialInput iconName="gift" />
            </FormItem>
            <FormItem name="url" label="Url" defaultValue={content?.url}>
              <MaterialInput iconName="earth" />
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
              <MaterialInput iconName="currency-usd" />
            </FormItem>
            <Text fontSize={15} color="black">
              Image
            </Text>
            <MaterialInput
              value={image}
              iconName="image"
            />
            <Button onPress={uploadImage} isLoading={uploadingImage}>
              {' '}
              Pick an image from camera roll{' '}
            </Button>
            <FormItem
              name="description"
              label="Description"
              defaultValue={content?.description}
            >
              <TextArea />
            </FormItem>
          </Form>
        </Column>
      </ScrollView>
    </Box>
  );
};

export default Index;
