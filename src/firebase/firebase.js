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
  apiKey: "AIzaSyCoTsNdUA4iFktvN_OUsc3TIDpaB--XkHw",
  authDomain: "loginfirebase-d3f44.firebaseapp.com",
  databaseURL: "https://loginfirebase-d3f44-default-rtdb.firebaseio.com",
  projectId: "loginfirebase-d3f44",
  storageBucket: "loginfirebase-d3f44.appspot.com",
  messagingSenderId: "1010714738989",
  appId: "1:1010714738989:web:4de7dc326dd60d257cd3a4",
  measurementId: "G-JRM6ZCWQ33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
  registerWithEmailAndPassword,
  logout,
}