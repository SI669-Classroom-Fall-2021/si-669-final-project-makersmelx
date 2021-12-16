import React from 'react';
import { Column, Text } from 'native-base';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { IWish, WishService } from '../../service';
import CompactListItem from '../CompactListItem';
import ClaimBadge from './ClaimBadge';
import LazyLoadImage from '../LazyLoadImage';

interface IProps {
  content: IWish;
  onNavigate?: () => void;
}

const getDate = (content: IWish) => {
  let ret;
  switch (content.state) {
    case WishService.WishState.Completed:
      ret = content.completedBy || content.claimedBy || content.createdAt;
      break;
    case WishService.WishState.Claimed:
      ret = content.claimedBy || content.createdAt;
      break;
    case WishService.WishState.Default:
    default:
      ret = content.createdAt;
      break;
  }
  return ret.toDate().toLocaleDateString('en-us');
}

const Index: React.FC<IProps> = ({ content, onNavigate }) => (
  <CompactListItem
    onPress={onNavigate}
    avatar={
      <LazyLoadImage
        source={{ uri: content.image }}
        style={{ width: 60, height: 60, borderRadius: 100 }}
      >
        <MaterialCommunityIcons
          name="gift-outline"
          color="black"
          size={30}
        />
      </LazyLoadImage>
    }
    content={
      <Column justifyContent="flex-start" space={2}>
        <Text
          fontWeight="semibold"
          textAlign="left"
          numberOfLines={1}
          fontSize={16}
        >
          {content.name}
        </Text>
        <ClaimBadge content={content} />
      </Column>
    }
    extra={
      <Column justifyContent="flex-start" space={3} height="100%">
        <Text textAlign="right" numberOfLines={1} color="gray.400">
          {getDate(content)}
        </Text>
        <Text textAlign="right" numberOfLines={1} color="gray.400">
          {`$${content.price}`}
        </Text>
      </Column>
    }
  />
);

export default Index;
