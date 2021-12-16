import React from 'react';
import { Column, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IFriend } from '../../service';
import { gravatarUrl } from '../../utils';
import LazyLoadImage from '../../component/LazyLoadImage';
import CompactListItem from '../../component/CompactListItem';

const Index: React.FC<{ content: IFriend }> = ({ content }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('FriendWishList' as never, { content } as never);
  };
  return (
    <CompactListItem
      onPress={onPress}
      avatar={
        <LazyLoadImage
          source={{ uri: gravatarUrl(content.gravatar) }}
          style={{ width: 60, height: 60, borderRadius: 100 }}
        >
          <MaterialCommunityIcons name="gift-outline" color="black" size={30} />
        </LazyLoadImage>
      }
      content={
        <Column justifyContent="center" flex={1}>
          <Text textAlign="left" numberOfLines={1} fontSize={16}>
            {content.username}
          </Text>
        </Column>
      }
    />
  );
};

export default Index;
