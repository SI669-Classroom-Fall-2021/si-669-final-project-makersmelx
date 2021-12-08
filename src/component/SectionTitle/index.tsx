import React, { ReactElement } from 'react';
import { Center, Heading, Row } from 'native-base';

interface IProps {
  title: string;
  extra?: ReactElement;
}

const Index: React.FC<IProps> = ({ title, extra }) => (
  <Center width="100%" backgroundColor="white">
    <Row width="90%" justifyContent="flex-end">
      <Heading size="sm" marginRight="auto">
        {title}
      </Heading>
      {extra}
    </Row>
  </Center>
);

export default Index;
