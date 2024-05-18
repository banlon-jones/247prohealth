import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import {Button} from "primereact/button";
import GenerateReferralLink from "../../components/referral/generate-referral-link";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {getReferralCode} from "../../services/personelService/personelService";
import {useEffect, useState} from "react";
import {getPatientBySpecialist, personelPatients} from "../../services/patientService/patientService";
import ListPatients from "../../components/patients/list-patients";
import {Dialog} from "primereact/dialog";

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getUser();
    getPatients();

  }, []);
  const navigate = useNavigate();

  const addPatient = async () => {
    const code = await getReferralCode(getAuth(app)?.currentUser?.email);
    navigate("/new-patient/" + code);
  }

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.specialties){
      setVisible(true);
    }
    setUser(user)
  }
  const getPatients = async () => {
      const code = await getReferralCode(getAuth(app)?.currentUser?.email);
      const pats = await personelPatients(code);
      setPatients(pats);
  }

  const getSpecialistPat = async () => {
    console.log(user?.specialties);
    setVisible(false)
    const pat = await getPatientBySpecialist(user?.specialties);
    setPatients(pat);
  }
  return (
    <>
      <div>
        <DashboardNavBar />
      </div>
      <div className="card flex justify-content-center">
        <Dialog header={`Welcome, Doctor ${user?.firstName}`} visible={visible} style={{ width: '50vw' }} onHide={getSpecialistPat}>
          <p className="m-0">
            We are delighted to have you as a part of our community. Feel free to discover, interact, and collaborate with us to create something wonderful."
          </p>
          <div className="text-center mt-3">
            <Button label="OK" severity="primary" onClick={getSpecialistPat}/>
          </div>
        </Dialog>
      </div>
      { user.isPromoter && <div className="pt-5 container text-end">
        <div className="flex flex-row justify-content-end">
          <Button label="Add Patient" severity="primary" onClick={addPatient}/>
          <GenerateReferralLink />
        </div>
      </div>}
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
