import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth,
         signInWithEmailAndPassword,
         signOut,
         } from "firebase/auth";
import { getFirestore,
         addDoc,
         collection
         } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  databaseURL: process.env.REACT_DATABASE_URL,
  projectId: process.env.REACT_PROJECT_ID,
  storageBucket: process.env.REACT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (auth, email, password, { setIsAuth }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('isAuth', true);
    setIsAuth(true);
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
}

const registerWithEmailAndPassword = async (auth, email, password, name, address, phonenumber, {setIsAuth}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password, name, address, phonenumber);
    const user = res.user;
    localStorage.setItem('isAuth', true);
    setIsAuth(true);
    await addDoc(collection(db, 'users'), { 
      uid: user.uid,
      authProvider: 'local ',
      name,
      email,
      address,
      phonenumber,
    });
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
}

const logout = ({ isAuth, setIsAuth }) => {
  signOut(auth).then(() => {
    localStorage.clear();
    setIsAuth(false);
    window.location.pathname = '/login'
  })
}

export {
  auth,
  db,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
}