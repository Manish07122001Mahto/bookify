import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
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

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  const fetchMyBooks = async () => {
    if (!user) {
      return;
    }
    const collectRef = collection(firestore, "books");
    const q = query(collectRef, where("userID", "==", user.uid));
    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
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
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
