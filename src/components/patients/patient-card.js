import patientAvatar from "../../assets/images/patient-avatar.png"
import WhatsappContact from "../whatsapp-contact/whatsapp-contact";
import {useTranslation} from "react-i18next";
const PatientCard = ({patient}) => {
  const { t, i18n } = useTranslation();

  return(
    <div className="p-6 rounded shadow">
      <div>
        <img src={patientAvatar} alt="avatar" className="img-fluid w-5" />
      </div>
      <div className="text-start py-2">
        <div className="py-2">
          {t('first_name')} : {patient?.firstName}
        </div>
        <div className="py-2">
          {t('last_name')}: {patient?.lastName}
        </div>
        <div className="py-2">
          {t('Email')} : {patient?.email}
        </div>
        <div className="py-2">
          {t('date_of_birth')} : {patient?.dob?.split("T")?.shift()}
        </div>
        <div className="py-2">
          Whatsapp : {patient?.contact}
          <div className="my-4">
            <WhatsappContact number={patient?.contact} message={t('call_or_msg')}/>
          </div>
        </div>
        <div className="border-1 border-dashed rounded p-3">
          <h4 className="text-gray-500">
            {t('address')}
          </h4>
          <div>
            {t('country')}: {patient?.address?.country}
          </div>
          <div className="my-3">
            {t('town')}: {patient?.address?.town}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
