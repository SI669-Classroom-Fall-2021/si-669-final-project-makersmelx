import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import database, { collectionName } from '../database';

interface IWish {
  name: string;
  url: string;
  description: string;
  image: string;
  state: number;
  claimedBy?: string;
}

const subCollectionOfUser = 'wishlist';

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
};
