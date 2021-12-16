import React, { cloneElement, ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Column,
  IBoxProps,
  KeyboardAvoidingView,
  ScrollView
} from 'native-base';
import FormItem from './FormItem';

interface IForm extends IBoxProps {
  space: number;
  onFinish: (value: any) => void;
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
  return (
    <FormProvider {...formMethods}>
      <Box {...rest}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <Column space={space * 2}>
              <Column space={space}>
                {children}
              </Column>
              {button}
            </Column>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </FormProvider>
  );
};
export default Index;
export { FormItem };
