import { getApps, initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../secret';

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
}

// @ts-ignore
const database = initializeFirestore(app, {
  useFetchStreams: false,
});

export default database;
