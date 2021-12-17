import React, { ReactElement, useMemo, useState } from 'react';
import { ImageBackground, ImageBackgroundProps } from 'react-native';
import { Center, Spinner } from 'native-base';

interface IProps extends ImageBackgroundProps {
  fallback?: ReactElement;
}

const Index: React.FC<IProps> = ({ fallback, source, children, ...rest }) => {
  const [completed, setCompleted] = useState(false);
  const onLoadStart = () => {
    setCompleted(false);
  };
  const onLoad = () => {
    setCompleted(true);
  };

  const content = () => {
    const spinner = (
      <Center flex={1}>
        <Spinner color="gray.500" size="lg" />
      </Center>
    );
    if (!source || !(source as any).uri) {
      return fallback || spinner;
    }
    return completed ? children : spinner;
  };

  return useMemo(
    () => (
      <ImageBackground {...rest} onLoad={onLoad} onLoadStart={onLoadStart} source={source}>
        {content()}
      </ImageBackground>
    ),
    [completed],
  );
};

export default Index;
