import { IWish } from '../../service';

export type WishParamList = {
  WishList: undefined;
  UpsertWish: { content: IWish; mode: 'edit' | 'update' } | undefined;
};
