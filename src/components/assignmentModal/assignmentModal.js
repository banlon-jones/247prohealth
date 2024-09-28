import React, {useRef, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {getAllSpecialist} from "../../services/personelService/personelService";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {assignPatientToDoctor} from "../../services/patientService/patientService";

const AssignmentModal = ({patientId, getPatientDetails}) => {
  const toast = useRef(null);
  const [assignmentModalvisible, setAssignmentModalvisible] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [specialists, setSpecialists] = useState([]);

  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: '', life: 3000 });
    assignPatientToDoctor(patientId, selectedSpecialist.id).then(() => {
      setAssignmentModalvisible(false);
      getPatientDetails();
    })
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail:'', life: 3000 });
  }
  const getSpecialists = async () => {
    const specialists = await getAllSpecialist();
    console.log(specialists);
    setSpecialists(specialists);
  }

  const showModal = () => {
    setAssignmentModalvisible(true);
    getSpecialists();
  }

  const assignmentConfirmation = () => {
    confirmDialog({
      message: 'Are you sure you want to assign patient to specialist?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept,
      reject
    });
  };

  return(
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button severity="primary" onClick={showModal}> Assign to Doctor </Button>
      <Dialog header="Asign Patient to Doctor" visible={assignmentModalvisible} style={{ width: '50vw' }} onHide={() => {if (!assignmentModalvisible) return; setAssignmentModalvisible(false); }}>
        <p className="m-0">
          <Dropdown value={selectedSpecialist} onChange={(e) => setSelectedSpecialist(e.value)} options={specialists} optionLabel={"firstName"}
                    placeholder="Select a Doctor" className="w-full" />
        </p>
        <div className="mt-4">
          <Button onClick={assignmentConfirmation} label="Assign"></Button>
        </div>
      </Dialog>
    </>
  );
}

export default AssignmentModal;
