import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import database, { collectionName } from '../database';

interface IWish {
  name: string;
  url: string;
  description: string;
  image: string;
  state: WishState;
  claimedBy?: string;
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
      subCollectionOfUser);
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
      itemID);
    await updateDoc(userDoc, newItem);
  },
  /**
   *
   * @param userID
   * @param itemID
   */
  async delete(userID: string, itemID: string) {
    const userDoc = doc(database, collectionName, userID, subCollectionOfUser,
      itemID);
    await deleteDoc(userDoc);
  },
  getWishRef(userID: string, itemID: string) {
    return doc(database, collectionName, userID, subCollectionOfUser, itemID);
  },
  onSnapShot(onNext: any) {
    return onSnapshot(collection(database, collectionName), onNext);
  },
  WishState,
};
