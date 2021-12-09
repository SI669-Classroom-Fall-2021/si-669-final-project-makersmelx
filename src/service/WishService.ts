import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import database, { collectionName } from '../database';

export interface IWish {
  name: string;
  url: string;
  description: string;
  image: string;
  price: string;
  createdAt: any;
  state: WishState;
  claimedBy?: string;
  completedBy?: any;
  key: string;
}

enum WishState {
  Default = 0,
  Claimed = 1,
  Completed = 2
}

const subCollectionOfUser = 'wish';

export default {
  /**
   * @param item
   * @param userID
   */
  async add(item: IWish, userID: string) {
    const collectionRef = collection(database, collectionName, userID,
      subCollectionOfUser
    );
    await addDoc(collectionRef, item);
  },
  /**
   *
   * @param newItem
   * @param userID
   * @param itemID
   */
  async update(newItem: IWish, userID: string, itemID: string) {
    const userDoc = doc(database, collectionName, userID, subCollectionOfUser,
      itemID
    );
    await updateDoc(userDoc, newItem);
  },
  /**
   *
   * @param userID
   * @param itemID
   */
  async delete(userID: string, itemID: string) {
    const userDoc = doc(database, collectionName, userID, subCollectionOfUser,
      itemID
    );
    await deleteDoc(userDoc);
  },
  getWishRef(userID: string, itemID: string) {
    return doc(database, collectionName, userID, subCollectionOfUser, itemID);
  },
  /**
   * Subscribe the collection of a user's wishes
   * @param userID
   * @param onNext
   */
  onSnapshotUserWish(userID: string, onNext: any) {
    return onSnapshot(
      collection(database, collectionName, userID, subCollectionOfUser),
      onNext
    );
  },
  WishState,
  subCollectionOfUser
};
