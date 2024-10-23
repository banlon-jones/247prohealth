import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRef, useState} from "react";
import {resetPassword} from "../../services/authService/authService";
import {Toast} from "primereact/toast";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate()

  const reset = async () => {
    try {
      await resetPassword(email)
      toast.current.show({ severity: 'success', summary: t('successful'), detail: t('email_sent') });
      navigate("/authentication")
    } catch (e) {
      console.log(e)
      toast.current.show({ severity: 'error', summary: t('error_rest_pwd'), detail: e.message });
    }
  }
  const { t, i18n } = useTranslation();


  return (
    <>
      <Toast ref={toast} />
      <div>
        <h1>{t('reset_pwd')}</h1>
        <small>{t('access_acc')}</small>
      </div>
      <div className="py-6 mx-5 flex flex-column justify-content-center">
        <div className="my-3">
          <InputText type="email" placeholder={t('Email')} className="col-12" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Button className="col-12" label={t('reset_email')} onClick={reset} />
        </div>
        <div>
          <p>{t('rem_pwd')}<a href="/signin"> {t('login')} </a></p>
        </div>
        <div>
          <p>{t('dnt_have_acc')} <a href="!#"> {t('to_register')} </a></p>
        </div>
      </div>
    </>
  )

}

export default RecoverPassword;
