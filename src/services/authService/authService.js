import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider
} from "firebase/auth";
import app from "../../config/firebaseConfig";


export const createUserWithPassword = async (email, password) => {
  const auth = getAuth(app);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(auth.currentUser);
  localStorage.setItem("user", JSON.stringify(userCredential.user))
  return userCredential.user;
}

export const signInUserWithPassword = async (email, password) => {
  const auth = getAuth(app);
  const userCredential =  await signInWithEmailAndPassword(auth, email, password)
  localStorage.setItem("user", JSON.stringify(userCredential.user))
  return userCredential.user
}

export const resetPassword = async (email) => {
  const auth = getAuth(app);
  return await sendPasswordResetEmail(auth, email)
}

export const logOut = async () => {
  const auth = getAuth(app);
  return await signOut(auth);
}

export const logInWithGoogle = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  localStorage.setItem("user", JSON.stringify(userCredential.user))
  return userCredential.user
}

export const logInWithFacebook = async () => {
  const auth = getAuth(app);
  const provider = new FacebookAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  localStorage.setItem("user", JSON.stringify(userCredential.user))
  return userCredential.user
}

