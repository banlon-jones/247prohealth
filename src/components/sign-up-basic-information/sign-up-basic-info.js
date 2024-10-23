import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {registerNewPersonel} from "../../services/personelService/personelService";
import {countries} from "../../constants/specialties";
import {Dropdown} from "primereact/dropdown";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const SignUpBasicInfo = ({stepper}) => {
  const { t, i18n } = useTranslation();

  const [country, setCountry] = useState()
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (country.name !== "India") {
        data = {...data,country: country.name, isPromoter: true, isSpecailist: false}
      }else {
        data = {...data,country: country.name, isPromoter: false, isSpecailist: true}
      }
      await registerNewPersonel({...data, email: JSON.parse(localStorage.getItem("user")).email})
      stepper.current.nextCallback()
    }catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div className="text-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2">
            <label>{t('first_name')}</label>
            <InputText placeholder={t('last_name')} className="w-full" {...register("firstName", {required: true})}/>
            { errors.firstName && <small className="text-danger">{t('fname_req')}</small>}
          </div>
          <div className="py-2">
            <label>{t('last_name')}</label>
            <InputText placeholder={t('last_name')} className="w-full" {...register("lastName", {required: true})}/>
            { errors.lastName && <small className="text-danger">{t('lname_req')}</small>}
          </div>
          <div className="py-2">
            <label>{t('date_of_birth')}</label>
            <Calendar placeholder={t('date_of_birth')} dateFormat="dd/mm/yy" className="w-full" {...register("dateOfBirth", {required: true})} />
            { errors.dateOrBirth && <small className="text-danger">{t('dob_req')}</small>}
          </div>
          <div className="py-2">
            <label>{t('country')}</label>
            <Dropdown value={country} onChange={(e) => setCountry(e.value)} options={countries} optionLabel="name"
                      placeholder={t('country')} className="w-full" />
          </div>
          <div className="py-2">
            <label>{t('address')}</label>
            <InputText placeholder={t('address')} className="w-full" {...register("address", {required: true})}/>
            { errors.lastName && <small className="text-danger">{t('address_Req')}</small>}
          </div>
          <div className="py-2">
            <Button label={t("save_and_cont")}  type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpBasicInfo;
