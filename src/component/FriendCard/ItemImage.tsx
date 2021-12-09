import React from 'react';
import { Avatar } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  image: string;
}

const Index: React.FC<IProps> = ({ image }) => (
  <Avatar
    size="lg"
    backgroundColor='white'
    source={{
      uri: image,
    }}
  >
    <MaterialCommunityIcons name="gift-outline" color="black" size={30} />
  </Avatar>
)

export default Index;
