import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
  subscribeAuth: onAuthStateChanged(auth, (user) => {
    console.log(user);
  }),
  auth,
};
