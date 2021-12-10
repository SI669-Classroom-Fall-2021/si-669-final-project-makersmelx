import React, { useState } from 'react';
import { Image } from 'react-native-elements';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Center } from 'native-base';
import { IWish } from '../../service';

interface IProps {
  content: IWish;
}

const Index: React.FC<IProps> = ({ content }) => {
  const [fallback, setFallBack] = useState(false);
  return (
    fallback ? <Center size={60}>
        <MaterialCommunityIcons name="gift-outline" color="black" size={30} />
      </Center>
      : <Image
        source={{
          uri: content.image,
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
        }}
        onError={() => {
          setFallBack(true);
        }}
      />
  );
};

export default Index;
