import React, { forwardRef } from 'react';
import { Icon, IInputProps, Input } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps extends IInputProps {
  iconName: string;
}

const Index = forwardRef(({ iconName, ...rest }: IProps, ref) => (<Input
  variant="underlined"
  InputLeftElement={<Icon
    as={<MaterialCommunityIcons name={iconName} />}
    size={5}
    color="muted.400"
  />}
  {...rest}
  ref={ref}
/>))

export default Index;
