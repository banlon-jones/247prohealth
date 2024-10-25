import {useRef, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import WhatsappContact from "../whatsapp-contact/whatsapp-contact";
import {FloatLabel} from "primereact/floatlabel";
import {InputTextarea} from "primereact/inputtextarea";
import {consultPatient} from "../../services/patientService/patientService";
import {Toast} from "primereact/toast";
import {useTranslation} from "react-i18next";

function ConsultationModel({phone, patientId}) {
  const { t, i18n } = useTranslation();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [complain, setComplain] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const show = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'saved' });
  };
  const handleSave = async () => {
    const specialist = JSON.parse(localStorage.getItem('user'))
    const status = await consultPatient(patientId, complain,recommendation, specialist)
    show()
    if (!status){
      setVisible(false)
    }
  }

  const headerElement = (
    <div>
      <Toast ref={toast} />
      <div className="flex flex-row justify-content-between">
        <div>
          <h3>{t('patient_con')}</h3>
        </div>
        <div className="mt-4">
         <WhatsappContact number={phone} message={t('call_or_msg')}/>
        </div>
      </div>
      <div>
        <small>
          {t('consult_a_pat')}
        </small>
      </div>
    </div>
  );

  return (
    <div>
      <Button label={t('consult_patient')} severity="success" onClick={() => setVisible(true)} />
      <Dialog header={headerElement} visible={visible} style={{ width: '90vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
        <div className="my-6">
          <FloatLabel>
            <InputTextarea id="patient-complian" value={complain} onChange={(e) => setComplain(e.target.value)} rows={10} className="col-12" />
            <label htmlFor="patient-complian">{t('pat_comp')}</label>
          </FloatLabel>
        </div>
        <div>
          <FloatLabel>
            <InputTextarea id="recommendation" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} rows={10} className="col-12"/>
            <label htmlFor="recommendation">{t('recomm')}</label>
          </FloatLabel>
        </div>
        <div className="flex flex-row justify-content-center mt-4">
          <Button label={t('save')} severity="primary" onClick={handleSave}/>
        </div>
      </Dialog>
    </div>
  )
}

export default ConsultationModel;
