import { getAuth, signInWithEmailAndPassword, sendEmailVerification,sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import app from "../../config/firebaseConfig";

export const getCurrentSignedInUser = () => {
  const auth = getAuth(app);
  return auth.currentUser
}

export const createUserWithPassword = async (email, password) => {
  const auth = getAuth(app);
  const user = await auth.createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(auth.currentUser);
  return user;
}

export const signInUserWithPassword = async (email, password) => {
  const auth = getAuth(app);
  const user =  await signInWithEmailAndPassword(auth, email, password)
  console.log(user)
  return user
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
  return await signInWithPopup(auth, provider)
}

export const logInWithFacebook = async () => {
  const auth = getAuth(app);
  const provider = new FacebookAuthProvider()
  return await signInWithPopup(auth, provider)
}

