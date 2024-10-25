import {useForm} from "react-hook-form";
import MainNavbar from "../../components/navbar/main-navbar";
import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {InputTextarea} from "primereact/inputtextarea";
import {useNavigate, useParams} from "react-router-dom";
import {newPatient} from "../../services/patientService/patientService";
import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import imgUrl from "../../assets/images/flat-doc.jpg";
import {Calendar} from "primereact/calendar";
import {countries, specialties} from "../../constants/specialties";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {useTranslation} from "react-i18next";


const AddPatientPage = () => {
  const { t, i18n } = useTranslation();
  const [specialist, setSpecialist] = useState(null);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [patientId, setPatientId] = useState('');
  const {ref} = useParams();
  const auth = getAuth(app);
  const {
    register,
    handleSubmit,
    formState: {errors}, reset} = useForm();

  const onSubmit = async (data) => {
    const date = new Date();
    const dat = new Date(data?.dateOfBirth)
    try {
      const patient = {
        ...data,
        specialists: specialist.map((item) => item.name),
        status: t('awaiting'),
        dob: dat.toISOString(),
        address: {
          country: selectedCountry?.name,
          town: data.town
        },
        createdAt: date.toISOString(),
        referral: ref
      }
      console.log(patient)
      delete patient.town
      const docRef = await newPatient(patient);
      setPatientId(docRef.id);
      setVisible(true);
      reset();
    } catch (e) {
    }
  }

  const handleOkClick = () => {
    navigate(auth?.currentUser?.email ? "/dashboard" : "/")
  }

  return(
    <>
      {auth?.currentUser?.email ? <DashboardNavBar /> : <MainNavbar />}
      <div>
        <h2>
          {t('patient_signup')}
        </h2>
        <div className="py-6 mx-5 text-start">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label>{t('first_name')}</label>
              <InputText type="text" placeholder={t('first_name')} className="col-12" {...register("firstName", {required: true})} />
              {errors.firstName &&<small className="text-danger">{t('name_req')}</small>}
            </div>
            <div className="mb-3">
              <label>{t('last_name')}</label>
              <InputText type="text" className="col-12" placeholder={t('last_name')} {...register("lastName", {required: true})} />
              { errors.lastName && <small className="text-danger">{t('name_req')}</small>}
            </div>
            <div className="mb-3">
              <label>{t('date_of_birth')}</label>
              <Calendar className="w-full" placeholder={t('date_of_birth')} {...register("dateOfBirth", {required: true})} />
            </div>
            <div className="my-3">
              <label>{t('Email')}</label>
              <InputText type="email" placeholder={t('Email')} className="col-12" {...register("email", {required: false})} />
            </div>
            <div className="mb-3">
              <label>{t('Whatsapp_contact')}</label>
              <InputText type="tel" className="col-12" placeholder={t('example'+ "+237 670070070")} {...register("contact", {required: true})} />
              { errors.contact && <small className="text-danger">{t('wha_req')}</small>}
            </div>
            <div className="mb-3 p-5 border-1 rounded border-dashed">
              <h3>
                {t('pat_address')}
              </h3>
              <small className="text-gray-600">{t('enter_pat')}</small>
              <div className="my-3">
                <label>{t('country')}</label>
                <div>
                  <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name"
                            placeholder={t('select_country')} className="w-full" />
                </div>
              </div>
              <div className="my-3">
                <label>{t('town')}</label>
                <InputText type="text" className="col-12" placeholder={t('town')} {...register("town", {required: true})} />
                { errors.town && <small className="text-danger">{t('town_req')}</small>}
              </div>
            </div>
            <div className="my-3">
              <label>{t('desc_signs_and_sypms')}</label>
              <div>
                <InputTextarea className="col-12" {...register("description", {required: true})} rows={5} cols={30} />
              </div>
              { errors.description && <small className="text-danger">{t('address_Req')}</small>}
            </div>
            <div className="py-2">
              <label> {t('Consult_Spec')} <small>(3 max)</small></label>
              <MultiSelect value={specialist} onChange={(e) => setSpecialist(e.value)} options={specialties} optionLabel="name" display="chip"
                           placeholder={t("slec_spec")} maxSelectedLabels={3} className="w-full" filter />

            </div>
            <div>
              <Button label={t('save_and_cont')} type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div>
        <Dialog header={t('pat_success_add')} visible={visible} style={{ width: '90vw' }} onHide={() => handleOkClick()}>
          <div className="text-center">
            <div>
              <img className="img-fluid" src={imgUrl} alt="flat doc" />
            </div>
            <div>
              {t('patient_rec')}<br/>
              <strong>{t('your_patient')}: {patientId}</strong><br/>
              {t('our_spec')}
            </div>
            <div className="text-center p-5">
              <Button label="Confirm" severity="primary" onClick={() => handleOkClick()} />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );

}

export default AddPatientPage;
