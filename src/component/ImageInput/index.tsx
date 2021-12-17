import React, { useState } from 'react';
import {
  Column,
  Icon,
  IInputProps,
  Pressable,
  Row,
  Spinner,
  Text,
  useToast
} from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRequest } from 'ahooks';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LoadingImageBackground from '../LoadingImageBackground';
import { PhotoService } from '../../service';
import { useAuth } from '../../auth/AuthProvider';

const Index = React.forwardRef(({ value, onChange, ...rest }: IInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const [image, setImage] = useState(value);
  const [isUpload, setIsUpload] = useState(false);
  const auth = useAuth();
  const toast = useToast();
  const uploadFailToast = 'upload fail';

  const { run: uploadImage, loading: uploadingImage } = useRequest(
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          throw new Error(
            'We need your camera permission to upload your photo');
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });

      if (!result.cancelled) {
        const newUri = await PhotoService.savePicture(auth.user.uid, result);
        setIsUpload(true);
        setImage(newUri);
        if (onChange) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange({ target: { value: newUri } });
        }
      }
    },
    {
      manual: true,
      onError: (error) => {
        toast.show({
          title: error.message,
          status: 'error',
          id: uploadFailToast,
          placement: 'top',
          duration: 3000,
        });
      },
    },
  );

  const textColor = () => (image ? 'white' : 'black');
  const prompt = () => {
    if (!image) {
      return 'Add photo';
    }
    return uploadingImage ? 'Processing...' : 'Update photo';
  };
  const AddPhoto = (
    <Row
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={image ? 'rgba(0,0,0,0.3)' : 'gray.100'}
      space={1}
      width="100%"
    >
      <Icon
        as={
          uploadingImage ? (
            <Spinner color={textColor()} size="lg" />
          ) : (
            <MaterialCommunityIcons
              name="camera-plus"
              size={30}
              color={textColor()}
              style={{ transform: [{ rotateY: '180deg' }] }}
            />
          )
        }
      />
      <Text color={textColor()} fontSize="md">
        {prompt()}
      </Text>
    </Row>
  );

  return (
    <Column flex={1} space={3}>
      <Pressable onPress={uploadImage} width="100%" height="200px">
        <LoadingImageBackground
          key={Date.now()}
          fallback={AddPhoto}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: image,
          }}
        >
          {AddPhoto}
        </LoadingImageBackground>
      </Pressable>
    </Column>
  );
});

export default Index;
