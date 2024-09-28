import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import PatientCard from "../../components/patients/patient-card";
import {Button} from "primereact/button";
import { useNavigate, useParams} from "react-router-dom";
import {getPatient} from "../../services/patientService/patientService";
import {useEffect, useState} from "react";
import AssignmentModal from "../../components/assignmentModal/assignmentModal";
import ConsultationModel from "../../components/consultationModal/consultationModel";

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
            {!JSON.parse(localStorage.getItem('user')).isPromoter && <div className="flex flex-row">
              <div className="mx-3">
                <AssignmentModal patientId={patient_id} getPatientDetails={getPatientDetails}/>
              </div>
              <div>
                <ConsultationModel phone={patient.contact} patientId={patient_id}/>
              </div>
            </div>}
          </div>
          {!patient.consultedBy && <div className="my-4">
            <p className="text-start">
              this patient is assigned to {patient.assignedTo} at {patient?.assignedAt}
            </p>
          </div>}
          {patient.consultedBy && <div className="text-start">
            <small className="text-start">
              this patient was consulted by Doc. {patient.consultedBy.firstName} {patient.consultedBy.lastName} at {patient.consultedAt}
            </small>
          </div>}
          <div className="mt-3">
            <div className="text-start shadow p-4 rounded">
              <p className="line-height-4">
                {patient.description}
              </p>
            </div>
          </div>
          {patient.complain && <div className="mt-3">
            <div className="text-start shadow p-4 rounded">
              <div>
                <h3>Complain</h3>
              </div>
              <p className="line-height-4">
                {patient.complain}
              </p>
            </div>
          </div>}
          {patient.recommendation && <div className="mt-3">
            <div className="text-start shadow p-4 rounded">
              <div>
                <h3>Doctor's Recommendation</h3>
              </div>
              <p className="line-height-4">
                {patient.recommendation}
              </p>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default PatientDetailsPage;
