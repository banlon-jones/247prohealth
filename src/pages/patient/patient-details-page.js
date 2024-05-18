import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import PatientCard from "../../components/patients/patient-card";
import {Button} from "primereact/button";
import { useNavigate, useParams} from "react-router-dom";
import {getPatient} from "../../services/patientService/patientService";
import {useEffect, useState} from "react";

const PatientDetailsPage = () => {
  const {patient_id} = useParams();
  const [patient, setPatient] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    getPatientDetails()
  }, []);


  const getPatientDetails = async () => {
    setPatient(await getPatient(patient_id));
  }

  return (
    <>
      <div>
        <DashboardNavBar />
      </div>
      <div className="container my-2">
        <div className="rounded p-1 text-start shadow-1">
          <Button text onClick={() => navigate(-1)}>
            Back to Dashboard
          </Button>
        </div>
      </div>
      <div className="container grid">
        <div className="col-12 md:col-4">
          <PatientCard  patient={patient}/>
        </div>
        <div className="col-12 md:col-8">
          <div className="flex flex-row justify-content-between">
            <h2> Patient Details </h2>
            <div>
              <Button severity="success"> Accept Patient </Button>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-start shadow p-4 rounded">
              <p className="line-height-4">
                {patient.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientDetailsPage;
