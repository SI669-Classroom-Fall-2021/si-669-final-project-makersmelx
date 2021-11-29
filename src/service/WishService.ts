import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import database from '../database';

interface IWish {
  name: string;
  url: string;
  description: string;
  image: string;
  state: number;
}

const collectionName = 'wishlist';

export default {
  /**
   * @param item
   * @param userID
   */
  async add(item: IWish, userID: string) {
    const userDoc = doc(database, collectionName, userID);
    const itemID = uuidv4();
    await updateDoc(userDoc, {
      [itemID]: item,
    });
  },
  /**
   *
   * @param newItem
   * @param itemID
   * @param userID
   */
  async update(newItem: IWish, itemID: string, userID: string) {
    const userDoc = doc(database, collectionName, userID);
    await updateDoc(userDoc, {
      [itemID]: newItem,
    });
  },
  /**
   *
   * @param itemID
   * @param userID
   */
  async delete(itemID: string, userID: string) {
    const userDoc = doc(database, collectionName, userID);
    await updateDoc(userDoc, {
      [itemID]: deleteField(),
    });
  },
};
