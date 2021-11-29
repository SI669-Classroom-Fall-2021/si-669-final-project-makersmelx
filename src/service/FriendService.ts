import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import database from '../database';

const collectionName = 'friend';
const fieldName = 'friend';

export default {
  /**
   * @param friendID
   * @param userID
   */
  async add(friendID: string, userID: string) {
    const userDoc = doc(database, collectionName, userID);
    await updateDoc(userDoc, {
      [fieldName]: arrayUnion(friendID),
    });
  },
  /**
   *
   * @param friendID
   * @param userID
   */
  async delete(friendID: string, userID: string) {
    const userDoc = doc(database, collectionName, userID);
    await updateDoc(userDoc, {
      [fieldName]: arrayRemove(friendID),
    });
  },
};
