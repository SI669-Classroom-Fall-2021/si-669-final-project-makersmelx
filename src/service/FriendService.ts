import { collection, doc, DocumentData, DocumentReference, getDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import database, { collectionName } from '../database';

const subCollectionOfUser = 'friend';
const subCollectionOfUserRequest = 'friendRequest';

export interface IFriend {
  // friendRef: any;
  // todo: help wish count
  ID: string; // Email
  name: string;
  image: string;
}

export default {
  /**
   * @param friendID
   * @param userID
   */
  async add(friendID: string, userID: string) {
    const batch = writeBatch(database);
    const friendRef = doc(database, collectionName, friendID);
    const friendSnap = await getDoc(friendRef);
    const friendInfo = friendSnap.data();
    console.log(friendInfo);
    const userRef = doc(database, collectionName, userID);
    const userSnap = await getDoc(userRef);
    const userInfo = userSnap.data();
    console.log(userInfo);
    batch.set(doc(userRef, subCollectionOfUser, friendID), 
      friendInfo
    );
    batch.set(doc(friendRef, subCollectionOfUser, userID), 
      userInfo
    );
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
  /**
   * @param friendID
   * @param userID
   */
   async addRequest(friendID: string, userID: string) {
    const batch = writeBatch(database);
    const friendRef = doc(database, collectionName, friendID);
    const userRef = doc(database, collectionName, userID);
    batch.set(doc(friendRef, subCollectionOfUserRequest, userID), {
      friendRef: userRef,
    });
    await batch.commit();
  },
  /**
   *
   * @param friendID
   * @param userID
   */
  async deleteRequest(friendID: string, userID: string) {
    const batch = writeBatch(database);
    const userRef = doc(database, collectionName, userID);
    batch.delete(doc(userRef, subCollectionOfUser, friendID));
    await batch.commit();
  },
  /**
   *
   * @param friendID
   */
   async getFriendInfo(friendRef: DocumentReference<DocumentData>) {
    const docSnap = await getDoc(friendRef);
    return docSnap;
  },
  /**
   * Subscribe the collection of a user's friends
   * @param userID
   * @param onNext
   */
  onSnapshotUserFriend(userID: string, onNext: any) {
    return onSnapshot(
      collection(database, collectionName, userID, subCollectionOfUser),
      onNext);
  },
  /**
   * Subscribe the collection of a user's friend requests
   * @param userID
   * @param onNext
   */
   onSnapshotUserFriendRequest(userID: string, onNext: any) {
    return onSnapshot(
      collection(database, collectionName, userID, subCollectionOfUserRequest),
      onNext);
  },
};
