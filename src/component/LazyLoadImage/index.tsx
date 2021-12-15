import React, { useState } from 'react';
import { Image } from 'react-native-elements';
import { Center } from 'native-base';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

interface IProps {
  source?: ImageSourcePropType | undefined;
  style?: StyleProp<ImageStyle>;
}

const Index: React.FC<IProps> = ({ source, style, children }) => {
  const [fallback, setFallBack] = useState(false);
  return fallback || !source ? (
    <Center style={style}>{children}</Center>
  ) : (
    <Image
      source={source}
      style={style}
      onError={() => {
        setFallBack(true);
      }}
    />
  );
};

export default Index;
