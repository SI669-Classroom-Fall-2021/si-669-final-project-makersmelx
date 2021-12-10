import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import database, { collectionName, userInfoCollection } from '../database';
import ClaimService from './ClaimService';
import WishService from './WishService';
import FriendService from './FriendService';

const auth = getAuth();

export default {
  async signUp(email: string, password: string, username: string) {
    const credential = await createUserWithEmailAndPassword(
      auth, email, password);
    const userPath = `${collectionName}/${credential.user.uid}`;
    await setDoc(doc(database, collectionName, credential.user.uid), {
      email,
      gravatar: email,
      username,
      ID: credential.user.uid,
    });
    await addDoc(
      collection(database, userPath, WishService.subCollectionOfUser), {
        _: '_init',
      });
    await addDoc(
      collection(database, userPath, FriendService.subCollectionOfUser), {
        _: '_init',
      });
    await addDoc(
      collection(database, userPath, ClaimService.subCollectionOfUser), {
        _: '_init',
      });
    await updateProfile(credential.user, {
      displayName: username,
    });
  },
  async signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  },
  async signOut() {
    await signOut(auth);
  },
  async getUserIDByEmail(email: string) {
    const q = query(
      collection(database, collectionName), where('email', '==', email));
    const docSnap = await getDocs(q);
    if (docSnap.docs.length === 0) {
      throw new Error('User Not Found');
    }
    const target = docSnap.docs[0].data();
    return target.ID;
  },
  subscribeAuth(nextObserver: NextOrObserver<User>) {
    return onAuthStateChanged(auth, nextObserver);
  },
  auth,
};
