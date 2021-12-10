import React from 'react';
import { Image } from 'react-native-elements';

interface IProps {
  image: string;
}

const Index: React.FC<IProps> = ({ image }) => (
  <Image
    source={{
      uri: image,
    }}
    style={{
      width: 60,
      height: 60,
      borderRadius: 100,
    }}
  />
);

export default Index;
