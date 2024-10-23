import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import facebookLogo from "../../assets/images/logos_facebook.png"
import GoogleAuthButton from "../social-auth-buttons/googleAuthButton";
import {signInUserWithPassword} from "../../services/authService/authService";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getPersonelByEmail} from "../../services/personelService/personelService";
import {useTranslation} from "react-i18next";

const SignIn = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors}} = useForm();
  const onSubmit = async (data) => {
    try {
      await signInUserWithPassword(data.email, data.password);
      const personel = await getPersonelByEmail(data.email)
      localStorage.setItem('user', JSON.stringify(personel));
      navigate('/dashboard');
    } catch (e) {
      toast.current.show({ severity: 'error', summary: t('error_login'), detail: e.message });
    }

  }
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Toast ref={toast} />
      <div>
        <h1>{t('login')}</h1>
        <p>{t('access_acc')}</p>
      </div>
      <div className="py-6 mx-5 text-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            {errors.email &&<small className="text-danger">{t("email_req")}</small>}
            <InputText type="email" placeholder={t('Email')} className="col-12" {...register("email", {required: true})} />
          </div>
          <div className="mb-3">
            { errors.password && <small className="text-danger">{t("pwd_req")}</small>}
            <InputText type="password" className="col-12" placeholder={t('pwd')} {...register("password", {required: true})} />
          </div>
          <div>
            <Button className="col-12" label={t('login')} type="submit" />
          </div>
          <div className="mt-2">
            <a href="/reset-password">{t('fgt_pwd')}</a>
          </div>
          <div className="mt-4 text-center">
            {t('dnt_have_acc')}<Link to="/signup">{t('to_register')}</Link>
          </div>
        </form>
        <div className="text-center font-light py-6">
          --- OR ---
        </div>
        <div className="text-center">
          <div className="mb-4">
            <GoogleAuthButton />
          </div>
          <div>
            <Button className="shadow-3 w-full flex justify-content-center" text raised>
              <img className="px-3" src={facebookLogo} alt=""/> {t('login_with')} Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
