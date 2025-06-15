import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAmBIJuuXQ1w_N3H2FF_ePzeHr4Go7XYpw",
  authDomain: "bookify-21313.firebaseapp.com",
  projectId: "bookify-21313",
  storageBucket: "bookify-21313.firebasestorage.app",
  messagingSenderId: "85050208531",
  appId: "1:85050208531:web:26e92ae1246a0fd4f0eae6",
};

export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };
  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{ signup, signin, signinWithGoogle, isLoggedIn }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
