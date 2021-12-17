import React, { useMemo, useState } from 'react';
import { Image } from 'react-native-elements';
import { Center, Spinner } from 'native-base';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

interface IProps {
  source?: ImageSourcePropType | undefined;
  style?: StyleProp<ImageStyle>;
}

const Index: React.FC<IProps> = ({ source, style, children }) => {
  const [fallback, setFallBack] = useState(false);
  return useMemo(
    () =>
      fallback || !source ? (
        <Center style={style}>{children}</Center>
      ) : (
        <Image
          resizeMode="cover"
          source={source}
          style={style}
          onError={() => {
            setFallBack(true);
          }}
          PlaceholderContent={<Spinner color="gray.500" />}
        />
      ),
    [fallback, Date.now()],
  );
};

export default Index;
