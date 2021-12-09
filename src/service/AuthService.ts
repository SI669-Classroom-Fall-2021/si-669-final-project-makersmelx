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
import { addDoc, collection } from 'firebase/firestore';
import database, { collectionName } from '../database';
import ClaimService from './ClaimService';
import WishService from './WishService';
import FriendService from './FriendService';

const auth = getAuth();

export default {
  async signUp(email: string, password: string, username: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const tmp = `${collectionName}/${credential.user.uid}`;
    await addDoc(collection(database, tmp, WishService.subCollectionOfUser), {
      _: '_init',
    });
    await addDoc(collection(database, tmp, FriendService.subCollectionOfUser), {
      _: '_init',
    });
    await addDoc(collection(database, tmp, ClaimService.subCollectionOfUser), {
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
  subscribeAuth(nextObserver: NextOrObserver<User>) {
    return onAuthStateChanged(auth, nextObserver);
  },
  auth,
  currentUser: auth.currentUser,
};
