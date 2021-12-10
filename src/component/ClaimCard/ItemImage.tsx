import React from 'react';
import { Avatar } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  url: string;
}

const Index: React.FC<IProps> = ({ url }) => (
  <Avatar
    size="lg"
    backgroundColor='white'
    source={{
      uri: url,
    }}
  >
    <MaterialCommunityIcons name="gift-outline" color="black" size={30} />
  </Avatar>
)

export default Index;
