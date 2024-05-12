import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import {Button} from "primereact/button";
import GenerateReferralLink from "../../components/referral/generate-referral-link";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {getReferralCode} from "../../services/personelService/personelService";
import {useEffect, useState} from "react";
import {personelPatients} from "../../services/patientService/patientService";
import ListPatients from "../../components/patients/list-patients";

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    getPatients();
  }, []);
  const navigate = useNavigate();
  const addPatient = async () => {
    const code = await getReferralCode(getAuth(app)?.currentUser?.email);
    navigate("/new-patient/" + code);
  }

  const getPatients = async () => {
    const code = await getReferralCode(getAuth(app)?.currentUser?.email);
    const pats = await personelPatients(code);
    setPatients(pats)
  }
  return (
    <>
      <div>
        <DashboardNavBar />
      </div>
      <div className="pt-5 container text-end">
        <div className="flex flex-row justify-content-end">
          <Button label="Add Patient" severity="primary" onClick={addPatient}/>
          <GenerateReferralLink />
        </div>
      </div>
      <div className="container">
        {(patients.length === 0) && <h3 className="text-gray-500">
          Your patient list is empty "click + add patient" to add a patient
        </h3>}
        {patients && <ListPatients patients={patients} />}

      </div>
    </>
  )

}

export default DashboardPage;
