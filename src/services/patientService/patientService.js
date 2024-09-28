import {addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
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

export const getPatientBySpecialist = async (specialistEmail) => {
  const patients = [];
  const patientRef = query(collection(database, "patients"));
  const q = query(patientRef, where('assignedTo', '==', specialistEmail));
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

export const getAllPatients = async () => {
  const patients = [];
  const querySnapshot = await getDocs(collection(database, 'patients'));
  querySnapshot.forEach(doc => {
    patients.push({id : doc?.id, ...doc.data()})
  })
  return patients;
}

export const assignPatientToDoctor = async (patientId, doctorEmail) => {
  const date = new Date()
  const patientRef = doc(database, "patients", patientId);
  return await updateDoc(patientRef, {
    assigned: true,
    assignedTo: doctorEmail,
    assignedAt: date.toISOString()
  });
}

export const consultPatient = async (patientId, complain, recommendation, specialist) => {
  const date = new Date()
  const patientRef = doc(database, "patients", patientId);
  return await updateDoc(patientRef, {
    consultedBy: specialist,
    consultedAt: date.toISOString(),
    complain: complain,
    recommendation: recommendation,
    status: "consulted"
  });
}



