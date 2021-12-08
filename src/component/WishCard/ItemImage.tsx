import React from 'react';
import { Avatar } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish } from '../../service';

interface IProps {
  content: IWish;
}

const Index: React.FC<IProps> = ({ content }) => (
  <Avatar
    size="lg"
    backgroundColor='white'
    source={{
      uri: content.image,
    }}
  >
    <MaterialCommunityIcons name="gift-outline" color="black" size={30} />
  </Avatar>
)

export default Index;
