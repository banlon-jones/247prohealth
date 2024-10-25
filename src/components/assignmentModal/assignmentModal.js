import React, {useRef, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {getAllSpecialist} from "../../services/personelService/personelService";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {assignPatientToDoctor} from "../../services/patientService/patientService";
import {useTranslation} from "react-i18next";


const AssignmentModal = ({patientId, getPatientDetails}) => {
  const { t, i18n } = useTranslation();

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
      message: t('are_you_sure_pat'),
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
      <Button severity="primary" onClick={showModal}> {t('assign_doc')} </Button>
      <Dialog header={t('assign_pat_doc')} visible={assignmentModalvisible} style={{ width: '50vw' }} onHide={() => {if (!assignmentModalvisible) return; setAssignmentModalvisible(false); }}>
        <p className="m-0">
          <Dropdown value={selectedSpecialist} onChange={(e) => setSelectedSpecialist(e.value)} options={specialists} optionLabel={"firstName"}
                    placeholder={t('select_doc')} className="w-full" />
        </p>
        <div className="mt-4">
          <Button onClick={assignmentConfirmation} label={t('assign')}></Button>
        </div>
      </Dialog>
    </>
  );
}

export default AssignmentModal;
