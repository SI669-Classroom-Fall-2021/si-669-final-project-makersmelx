import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  collection,
  initializeFirestore,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../secret';

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
}

const database = initializeFirestore(app as FirebaseApp, {});

export const collectionName = 'users';
export const userInfoCollection = 'userInfo';

/**
 * Subscribe at any collection starting from the root collection
 * @param paths paths starting from the root collection, like ['user id', 'wish','wish id']
 * @param onNext
 */
export const OnSnapshotFromRoot = (paths: string[], onNext: any) =>
  onSnapshot(collection(database, collectionName, ...paths), onNext);

export default database;
