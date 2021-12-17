import React, { useLayoutEffect } from 'react';
import {
  Column,
  Icon,
  Pressable,
  Spinner,
  TextArea,
  useToast
} from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFormContext } from 'react-hook-form';
import { useRequest } from 'ahooks';
import { v4 as uuidv4 } from 'uuid';
import { FormItem } from '../../component/Form';
import MaterialInput from '../../component/MaterialInput';
import ImageInput from '../../component/ImageInput';
import { WishParamList } from './WishParamList';
import { IWish, PhotoService, WishService } from '../../service';
import { useAuth } from '../../auth/AuthProvider';

type UpsertRouteProp = RouteProp<WishParamList, 'UpsertWish'>;

const Index: React.FC = () => {
  const route = useRoute<UpsertRouteProp>();
  const navigation = useNavigation();
  const content = route.params?.content;
  const mode = route.params?.mode;
  const isEdit = mode === 'edit';

  const formMethods = useFormContext();
  const toast = useToast();
  const formFailToast = 'form-fail-toast';
  const auth = useAuth();
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
        newContent.image = await PhotoService.savePicture(
          auth.user.uid, newContent.image);
        await WishService.update(newContent, auth.user.uid, content.key);
      } else {
        const cloudUri = value.image ? await PhotoService.savePicture(
          auth.user.uid, value.image) : '';

        const newContent = {
          name: value.name || '',
          url: value.url || '',
          description: value.description || '',
          image: cloudUri,
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? `Edit wish` : 'Make a new Wish',
      headerRight: () => (
        loading ? <Spinner color="gray.500" size="sm" />
          : <Pressable
            onPress={async () => {
              const isValidated = await formMethods.trigger();
              if (isValidated) {
                await run(formMethods.getValues());
              }
            }}
          >
            <Icon
              as={<MaterialCommunityIcons
                name="send"
              />}
              size='sm'
              color="gray.500"
            />
          </Pressable>
      ),
    });
  });

  return (
    <Column space={6}>
      <FormItem
        name="name"
        label="Gift Name"
        defaultValue={content?.name}
        rules={{ required: 'Gift Name is required' }}
      >
        <MaterialInput iconName="gift" />
      </FormItem>
      <FormItem name="url" label="Website" defaultValue={content?.url}>
        <MaterialInput iconName="earth" />
      </FormItem>
      <FormItem
        name="price"
        label="Estimated Price"
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
      <FormItem
        name="description"
        label="Description"
        defaultValue={content?.description}
      >
        <TextArea />
      </FormItem>
      <FormItem
        name="image"
        label="Upload a photo"
        defaultValue={content?.image}
      >
        <ImageInput />
      </FormItem>
    </Column>
  );
};

export default Index;
