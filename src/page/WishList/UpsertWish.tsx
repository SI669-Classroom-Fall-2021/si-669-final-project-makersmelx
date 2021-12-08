/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Center, Input, TextArea } from 'native-base';
import Form, { FormItem } from '../../component/Form';
import { IWish, WishService } from '../../service';

const userId = '1';

function Edit({ route, navigation }: { route: any; navigation: any }) {
  const { content, mode }: { content: IWish; mode: string } = route.params;
  const [inputName, setInputName] = useState(content ? content.name : '');
  const [inputLink, setInputLink] = useState(content ? content.url : '');
  const [inputDescription, setInputDescription] = useState(content ? content.description : '');
  const [inputPrice, setInputPrice] = useState(content ? content.price : '');

  return (
    <Center flex={1}>
      <Box safeArea flex={1} width="80%">
        <Form
          space={8}
          submitButton={mode === 'edit' ? 'Update Item' : 'Add to Wishlist'}
          onFinish={() => {
            if (mode === 'edit') {
              const newItem: IWish = content;
              newItem.name = inputName;
              newItem.url = inputLink;
              newItem.description = inputDescription;
              newItem.createdAt = Date.now();
              WishService.update(newItem, userId, newItem.key);
              navigation.navigate('Home');
            } else {
              const newItem: IWish = {
                name: inputName,
                url: inputLink,
                description: inputDescription,
                image: 'www.google.com',
                price: inputPrice,
                createdAt: Date.now(),
                state: WishService.WishState.Default,
                key: Math.random().toString(36).substring(7),
              };
              WishService.add(newItem, userId);
              navigation.navigate('Home');
            }
          }}
          onError={(error) => {
            console.error(error);
          }}
        >
          <FormItem
            name="Name"
            label="itemName"
            defaultValue={inputName}
            helperText={['Input the name of the item you want']}
          >
            <Input value={inputName} onChangeText={setInputName} />
          </FormItem>
          <FormItem name="Link" label="link" defaultValue={inputLink}>
            <Input value={inputLink} onChangeText={setInputLink} />
          </FormItem>
          <FormItem name="Price" label="price" defaultValue={inputPrice}>
            <Input value={inputPrice} onChangeText={setInputPrice} />
          </FormItem>
          <FormItem name="Description" label="description" defaultValue={inputDescription}>
            <TextArea value={inputDescription} onChangeText={setInputDescription} />
          </FormItem>
        </Form>
      </Box>
    </Center>
  );
}

export default Edit;
