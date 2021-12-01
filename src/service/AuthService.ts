import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const auth = getAuth();

export default {
  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  async signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  },
  async signOut(){
    await signOut(auth);
  },
  subscribeAuth: onAuthStateChanged(auth, (user) => {
    console.log(user);
  }),
  auth,
};
