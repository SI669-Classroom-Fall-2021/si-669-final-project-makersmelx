import { doc, writeBatch } from 'firebase/firestore';
import database, { collectionName } from '../database';

const subCollectionOfUser = 'friend';

interface IFriend {
  friendRef: any;
  // todo: help wish count
}

export default {
  /**
   * @param friendID
   * @param userID
   */
  async add(friendID: string, userID: string) {
    const batch = writeBatch(database);
    const friendRef = doc(database, collectionName, friendID);
    const userRef = doc(database, collectionName, userID);
    batch.set(doc(userRef, subCollectionOfUser, friendID), {
      friendRef,
    } as IFriend);
    batch.set(doc(friendRef, subCollectionOfUser, userID), {
      friendRef: userRef,
    } as IFriend);
    await batch.commit();
  },
  /**
   *
   * @param friendID
   * @param userID
   */
  async delete(friendID: string, userID: string) {
    const batch = writeBatch(database);
    const friendRef = doc(database, collectionName, friendID);
    const userRef = doc(database, collectionName, userID);
    batch.delete(doc(userRef, subCollectionOfUser, friendID));
    batch.delete(doc(friendRef, subCollectionOfUser, userID));
    await batch.commit();
  },
};
