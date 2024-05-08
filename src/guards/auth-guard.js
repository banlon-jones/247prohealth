import {getAuth, onAuthStateChanged} from "firebase/auth";
import app from "../config/firebaseConfig";

export const isLoggedIn = async () => {
  const auth = getAuth(app);
  await onAuthStateChanged(auth, (user) => {
    return !!user;
  })
}
