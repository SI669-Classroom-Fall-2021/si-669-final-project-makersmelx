import React from 'react';
import { Box, Column, ScrollView } from 'native-base';
import Form from '../../component/Form';

import UpsertWish from './UpsertWish';

const Index: React.FC = () => (
  <Box bg="white">
    <ScrollView height="100%">
      <Column safeArea justifyContent="flex-start" alignItems="center" height="100%">
        <Form space={6} width="90%">
          <UpsertWish />
        </Form>
      </Column>
    </ScrollView>
  </Box>
);

export default Index;
