import React, { createContext, useContext, useEffect, useState } from 'react';
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
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import firebase from 'firebase/compat';
import database, { collectionName } from '../database';
import { ClaimService, FriendService, WishService } from '../service';

const AuthContext = createContext<any>(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [profile, setProfile] = useState<any>();
  const auth = getAuth();

  const AuthService = {
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
      await AuthService.signIn(email, password);
    },
    async signIn(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        setUser(auth.currentUser);
        setProfile(await AuthService.getProfile());
      }
    },
    async signOut() {
      await signOut(auth);
      setUser(null);
      setProfile(null);
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
    async getProfile() {
      const snap = await getDoc(
        doc(database, collectionName, auth.currentUser?.uid || ''));
      return snap.data();
    },
    subscribeAuth(nextObserver: NextOrObserver<User>) {
      return onAuthStateChanged(auth, nextObserver);
    },
  };

  let unsubscribe: firebase.Unsubscribe;
  useEffect(() => {
    if (unsubscribe) {
      unsubscribe();
    }
    unsubscribe = auth.onAuthStateChanged((userSnapshot) => {
      if (userSnapshot) {
        setUser(userSnapshot)
      }
    });
    if (user) {
      AuthService.getProfile().then((ret) => {
        setProfile(ret);
      })
    }
    return unsubscribe;
  }, [user]);

  const value = {
    user,
    setUser,
    profile,
    setProfile,
    auth,
    ...AuthService,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
