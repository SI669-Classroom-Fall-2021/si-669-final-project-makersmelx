# si-669-final-project
A wishlist among friends

# Setup
Create a file named `secret.ts` at `/src`. and fill in with the firebase auth key.
~~~typescript
export default {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
};
~~~



# Components

## Form

### Form

A form that manages all the data inside

| Field        | Type                                | Description                             | Default |
| ------------ | ----------------------------------- | --------------------------------------- | ------- |
| space        | number                              | (required) space between two form items | -       |
| onFinish     | (Value:any)=>void                   | (required)success callback              | -       |
| onError      | (Errore:any)=>void                  | Failure callback                        | -       |
| submitButton | String \| ReactElement \| undefined | the submit button                       | -       |

### FormItem

| Field        | Type               | Description                                       | Default |
| ------------ | ------------------ | ------------------------------------------------- | ------- |
| name         | string             | name of the field in the form data                | -       |
| label        | string             | the label displayed                               | -       |
| defaultValue | any                | (required) the default value of this field        | -       |
| helperText   | string \| string[] | the helper text(s) displayed under the input area | -       |
| rules        | RegisterOptions    | https://react-hook-form.com/api/useform/register  | -       |
