import React, { useMemo, useState } from 'react';
import { ImageBackground, ImageBackgroundProps } from 'react-native';
import { Center, Spinner } from 'native-base';

const Index: React.FC<ImageBackgroundProps> = ({ children, ...rest }) => {
  const [completed, setCompleted] = useState(false);
  const onLoadStart = () => {
    setCompleted(false);
  };
  const onLoad = () => {
    setCompleted(true);
  };
  return useMemo(
    () => (
      <ImageBackground {...rest} onLoad={onLoad} onLoadStart={onLoadStart}>
        {completed ? (
          children
        ) : (
          <Center flex={1}>
            <Spinner color="gray.500" size="lg" />
          </Center>
        )}
      </ImageBackground>
    ),
    [completed],
  );
};

export default Index;
