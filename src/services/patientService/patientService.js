import {query, addDoc, collection, getFirestore, where, getDocs, doc, getDoc} from "firebase/firestore";
import app from "../../config/firebaseConfig";

const database = getFirestore(app)

export const newPatient = async (patient) => {
  return await addDoc(collection(database, "patients"), patient)
}

export const personelPatients = async (referralCode) => {
  let patients = [];
  const q = query(collection(database, "patients"), where("referral", "==", referralCode));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    patients.push({id : doc?.id, ...doc.data()})
  });
  return patients;
}

export const getPatient = async (patientId) => {
  const docSnap = await getDoc(doc(database, "patients", patientId));
  //console.log(docSnap.exists())
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}
