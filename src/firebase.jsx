import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword , updatePassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA9NqJZQ1b7OJBZ32vMDsTE_m889CUqgAA",
  authDomain: "theinkishaaf.firebaseapp.com",
  projectId: "theinkishaaf",
  storageBucket: "theinkishaaf.appspot.com",
  messagingSenderId: "491849131101",
  appId: "1:491849131101:web:b7b8c5aaf34312c015d9b4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db, storage };

export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  export const updateUserPassword = async (newPassword) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        alert('Password updated successfully');
      } else {
        throw new Error('No user is logged in');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };
  