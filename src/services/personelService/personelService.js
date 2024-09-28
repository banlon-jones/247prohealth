import {getDoc, getFirestore, updateDoc, doc, setDoc, query, collection, where, getDocs} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import {UniqueCharOTP} from "unique-string-generator";
import {getAuth} from "firebase/auth";

const database = getFirestore(app)

export const registerNewPersonel = async (doctor) => {
  try {
    return await setDoc(doc(database, "doctors", doctor.email), doctor);
  } catch (e) {
    console.log(e);
  }
}

export const getPersonelByEmail = async (email) => {
    const docSnap = await getDoc(doc(database, "doctors", email));
    if (docSnap.exists()){
      return docSnap.data()
    } else {
      console.log("document not found")
    }
}

export const updatePersonel = async (data, email) => {
  return await updateDoc(doc(database, "doctors",email), data);
}

export const getReferralCode = async (personelEmail) => {
  const personel = await getPersonelByEmail(personelEmail);
  if (personel?.referralLink) {
    return personel?.referralLink;
  } else {
    const code = UniqueCharOTP(8)
    await updatePersonel({referralLink: code}, getAuth(app).currentUser?.email);
    return code;
  }
}

export const getAllSpecialist = async () => {
  const specialists = [];
  const specialistRef = query(collection(database, "doctors"));
  const q = query(specialistRef, where('isSpecailist', "==", true));
  const querySnapShot = await getDocs(q)
  querySnapShot.forEach(doc => {
    specialists.push({id : doc?.id, ...doc.data()});
  })
  return specialists;
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
