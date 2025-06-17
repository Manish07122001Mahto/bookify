import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../Firebase.config.js";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

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

  const addListing = async (name, isbn, price, url) => {
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      url,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
    });
  };

  const listAllBooks = async () => {
    return getDocs(collection(firestore, "books"));
  };
  return (
    <FirebaseContext.Provider
      value={{
        signup,
        signin,
        signinWithGoogle,
        isLoggedIn,
        addListing,
        listAllBooks,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
