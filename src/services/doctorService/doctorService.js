import { getDoc, getFirestore, updateDoc, doc, setDoc} from "firebase/firestore";
import app from "../../config/firebaseConfig";

const database = getFirestore(app)

export const registerNewDoctor = async (doctor) => {
  try {
    return await setDoc(doc(database, "doctors", doctor.email), doctor);
  } catch (e) {
    console.log(e);
  }
}

export const getDoctorByEmail = async (email) => {
    const docSnap = await getDoc(doc(database, "doctors", email));
    if (docSnap.exists()){
      return docSnap.data()
    } else {
      console.log("document not found")
    }
}

export const updateDoctor = async (data, email) => {
  return await updateDoc(doc(database, "doctors",email), data);
}

/*
*
* const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
*
* */
