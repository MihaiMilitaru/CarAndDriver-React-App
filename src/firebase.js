import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const config = {
  apiKey: "AIzaSyD1A86OCeDV634owkeBN9DnB4uytUEVxyg",
  authDomain: "react-app-reviews.firebaseapp.com",
  projectId: "react-app-reviews",
  storageBucket: "react-app-reviews.appspot.com",
  messagingSenderId: "583579171753",
  appId: "1:583579171753:web:ff7a3b7cb2419bf1d4a2b8",
  measurementId: "G-XZE7Z03SS2"
};

const firebase = initializeApp(config);

firebase.firestore();

const auth = firebase.auth()

const storage = firebase.storage();

export default firebase;

export { auth, storage }

// const app = initializeApp(config);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);
//
// export default app;
//
// export { db, auth, storage };


