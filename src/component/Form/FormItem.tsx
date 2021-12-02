import React, { cloneElement, ReactElement } from 'react';
import {
  RegisterOptions,
  useController,
  useFormContext
} from 'react-hook-form';
import { FormControl } from 'native-base';

interface IItem {
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
                                }) => {
  const formContext = useFormContext();
  const { control, formState: { errors } } = formContext;
  if (!name) {
    return <>{children}</>;
  }
  const { field } = useController({ name, control, rules, defaultValue });
  const firstChild = cloneElement(
    React.Children.toArray(children)[0] as ReactElement, {
      onChange: field.onChange,
      onBlur: field.onBlur,
      value: field.value,
    });
  const helperTextComponent = helperText &&
    <FormControl.HelperText>{helperText}</FormControl.HelperText>;
  const restChildren = React.Children.toArray(children).slice(1);
  const textComponent = errors[name]
    ? <FormControl.HelperText _text={{ color: 'error.500' }}>
      {errors[name].message}
    </FormControl.HelperText>
    : helperTextComponent;
  return (
    <FormControl isRequired={rules?.required as boolean}>
      <FormControl.Label>{label}</FormControl.Label>
      {firstChild}
      {textComponent}
      {restChildren}
    </FormControl>
  );
};

export default Index;
