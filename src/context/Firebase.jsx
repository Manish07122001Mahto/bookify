import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

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

export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={{}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
