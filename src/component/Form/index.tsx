import React, { cloneElement, ReactElement } from 'react';
import { Platform } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Column,
  IBoxProps,
  KeyboardAvoidingView
} from 'native-base';
import FormItem from './FormItem';

interface IForm extends IBoxProps {
  space: number;
  onFinish?: (value: any) => void;
  onError?: (error: any) => void;
  submitButton?: string | ReactElement;
}

const Index: React.FC<IForm> = ({
  children,
  onFinish,
  onError,
  space,
  submitButton,
  ...rest
}) => {
  const formMethods = useForm();
  const button =
    submitButton &&
    (typeof submitButton === 'string' ? (
      <Button
        onPress={formMethods.handleSubmit(
          onFinish, onError)}
      >{submitButton}</Button>
    ) : (
      cloneElement(submitButton, {
        onPress: formMethods.handleSubmit(onFinish, onError),
      })
    ));

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  return (
    <FormProvider {...formMethods}>
      <Box {...rest}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios"
            ? "position"
            : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Column space={space * 2}>
            <Column space={space}>
              {children}
            </Column>
            {button}
          </Column>
        </KeyboardAvoidingView>
      </Box>
    </FormProvider>
  );
};
export default Index;
export { FormItem };
