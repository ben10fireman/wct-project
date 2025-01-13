import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdrfntBMVNv7shPHMTB8Ev1WZz6PvL-y4",
  authDomain: "wct-buyme-c7fba.firebaseapp.com",
  projectId: "wct-buyme-c7fba",
  storageBucket: "wct-buyme-c7fba.appspot.com",
  messagingSenderId: "352402294203",
  appId: "1:352402294203:web:0871c42b2a29d351cbb09e",
};

// Log the configuration for debugging
console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to browserLocalPersistence");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: "admin" | "customer"
): Promise<void> {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user role, name, and data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: name, // Add name field
      role: role, // 'admin' or 'customer'
    });

    console.log(
      `User registered successfully with name: ${name}, role: ${role}`
    );
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow error to handle it in the calling component
  }
}

// Login user function
export async function loginUser(email: string, password: string) {
  try {
    // Sign in user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User not found in Firestore");
    }

    const userData = userDoc.data();
    return {
      email: userData?.email || "",
      role: userData?.role || "",
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export { app, auth, db };
