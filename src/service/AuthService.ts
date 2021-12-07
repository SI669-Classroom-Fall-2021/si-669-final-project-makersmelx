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

const auth = getAuth();

export default {
  async signUp(email: string, password: string, username: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
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
};
