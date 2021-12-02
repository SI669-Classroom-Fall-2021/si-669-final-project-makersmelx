import React, { cloneElement, ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Column } from 'native-base';
import FormItem from './FormItem';

interface IForm {
  space: number;
  onFinish: (value: any) => void;
  onError: (error: any) => void;
  submitButton: string | ReactElement;
}

const Index: React.FC<IForm> = ({ children, onFinish, onError, space, submitButton }) => {
  const formMethods = useForm();
  const button =
    typeof submitButton === 'string' ? (
      <Button onPress={formMethods.handleSubmit(onFinish, onError)}>{submitButton}</Button>
    ) : (
      cloneElement(submitButton, {
        onPress: formMethods.handleSubmit(onFinish, onError),
      })
    );
  return (
    <FormProvider {...formMethods}>
      <Column space={space}>
        {children}
        {button}
      </Column>
    </FormProvider>
  );
};
export default Index;
export { FormItem };