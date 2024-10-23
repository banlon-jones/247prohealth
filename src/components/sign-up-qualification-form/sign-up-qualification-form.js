import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {certificates, experienceLevels, specialties} from "../../constants/specialties";
import {useState} from "react";
import {updatePersonel} from "../../services/personelService/personelService";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SignUpQualificationForm = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [specialty, setSpecialty] = useState(null);

  const onSubmit = async () => {
    const data = {
      experience: experience.name,
      highestCertificate: certificate.name,
      specialties: specialty.map((item) => item.name)
    }
    //
    await updatePersonel(data, getAuth(app).currentUser.email);
    navigate("/dashboard");
  }

  return (
    <div className="text-start">
      <form>
        <div className="py-2">
          <label>{t('experience')}</label>
          <Dropdown value={experience}
                    onChange={(e) => setExperience(e.value)}
                    options={experienceLevels} optionLabel="option"
                    checkmark={true}
                    placeholder={t('select_exp')} className="w-full"/>
        </div>
        <div className="py-2">
          <label> {t('high_cert')}</label>
          <Dropdown value={certificate} onChange={(e) => setCertificate(e.value)} options={certificates} optionLabel="name"
                    placeholder={t('select_cert')} className="w-full" />
        </div>
        <div className="py-2">
          <label> {t('specialty')} <small>(3 max)</small></label>
          <MultiSelect value={specialty} onChange={(e) => setSpecialty(e.value)} options={specialties} optionLabel="name" display="chip"
                       placeholder={t('select_spec')} maxSelectedLabels={3} className="w-full" filter />

        </div>
      </form>
      <div className="py-2">
        <Button label={t('save_and_cont')} onClick={onSubmit} />
      </div>
    </div>
  )
}

export default SignUpQualificationForm;
