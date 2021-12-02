import React, { useState } from 'react';
import { Icon, IInputProps, Input, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Index = React.forwardRef(
  (props: IInputProps, ref: React.Ref<HTMLInputElement>) => {
    const [visible, setVisible] = useState(false);
    const iconName = visible ? 'visibility' : 'visibility-off';
    const type = visible ? 'text' : 'password';
    const rightIcon = (
      <Pressable
        onPress={() => {
          setVisible(!visible);
        }}
      >
        <Icon as={<MaterialIcons name={iconName} />} size={5} mr="2"
              color="muted.400" />
      </Pressable>
    );
    return <Input ref={ref} {...props} type={type}
                  InputRightElement={rightIcon} />;
  });

export default Index;
