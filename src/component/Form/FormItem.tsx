import React, { cloneElement, ReactElement } from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';
import { Box, Center, FormControl, IBoxProps } from 'native-base';

interface IItem extends IBoxProps {
  name?: string;
  label?: string;
  defaultValue: any;
  helperText?: string | string[];
  rules?: RegisterOptions;
}

const Index: React.FC<IItem> = ({
  children,
  name,
  label,
  defaultValue,
  helperText,
  rules,
  ...rest
}) => {
  const formContext = useFormContext();
  const { control, formState: { errors } } = formContext;
  if (!name) {
    return <>{children}</>;
  }
  const { field } = useController({ name, control, rules, defaultValue });
  const firstChild = cloneElement(
    React.Children.toArray(children)[0] as ReactElement, {
      onChange: (event: any) => {
        const finalValue = event.target.value || event.nativeEvent.text;
        field.onChange(finalValue);
      },
      onBlur: field.onBlur,
      value: field.value,
    });
  const helperTextComponent = helperText &&
    <FormControl.HelperText>{helperText}</FormControl.HelperText>;
  const restChildren = React.Children.toArray(children).slice(1);
  const errorTextComponent = errors[name] ? (
    <FormControl.HelperText
      _text={{ color: 'error.500' }}
    >{errors[name].message}</FormControl.HelperText>
  ) : null;
  return (
    <Center flex={1}>
      <Box width="100%" height="100%" {...rest}>
        <FormControl isRequired={rules?.required as boolean}>
          <FormControl.Label>{label}</FormControl.Label>
          {firstChild}
          {errorTextComponent}
          {helperTextComponent}
          {restChildren}
        </FormControl>
      </Box>
    </Center>
  );
};

export default Index;
