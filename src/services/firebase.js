import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if config is provided
let app, auth, db, provider;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    provider = new GoogleAuthProvider();
  }
} catch (error) {
  console.error("Firebase initialization error", error);
}

export const logInWithGoogle = async () => {
  if (!auth) throw new Error("Firebase is not initialized. Please configure your .env file.");
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logInAsGuest = async () => {
  if (!auth) throw new Error("Firebase is not initialized. Please configure your .env file.");
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error("Error signing in as guest", error);
    throw error;
  }
};

export const logOut = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

export const saveHistoryToFirestore = async (userId, history) => {
  if (!db) return;
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { history: history }, { merge: true });
  } catch (error) {
    console.error("Error saving history to Firestore", error);
  }
};

export const fetchHistoryFromFirestore = async (userId) => {
  if (!db) return null;
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data().history;
    }
    return null;
  } catch (error) {
    console.error("Error fetching history from Firestore", error);
    return null;
  }
};

export const deleteHistoryFromFirestore = async (userId) => {
  if (!db) return;
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { history: [] }, { merge: true });
  } catch (error) {
    console.error("Error deleting history from Firestore", error);
  }
};

export { auth, db, onAuthStateChanged };
