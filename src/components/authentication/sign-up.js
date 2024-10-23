import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import facebookLogo from "../../assets/images/logos_facebook.png"
import GoogleAuthButton from "../social-auth-buttons/googleAuthButton";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {createUserWithPassword} from "../../services/authService/authService";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const SignUp = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const toast = useRef(null);
  const {
    register,
    handleSubmit,
    formState: {errors}} = useForm();
  const onSubmit = async (data) => {
    try {
      await createUserWithPassword(data.email, data.password);
      navigate("/get-started")

    } catch (e) {
      toast.current.show({ severity: 'error', summary: t('error_login'), detail: e.message });
    }

  }
  return (
    <div>
      <Toast ref={toast} />
      <div>
        <h1>{t('signup')}</h1>
        <p>{t('create_acc')}</p>
      </div>
      <div className="py-6 mx-5 text-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            {errors.email &&<small className="text-danger">{t('email_req')}</small>}
            <InputText type="email" placeholder={t('Email')} className="col-12" {...register("email", {required: true})} />
          </div>
          <div className="mb-3">
            { errors.password && <small className="text-danger">{t('pwd_req')}</small>}
            <InputText type="password" className="col-12" placeholder={t('pwd')} {...register("password", {required: true})} />
          </div>
          <div>
            <Button className="col-12" label="Sign Up" type="submit" />
          </div>

          <div className="mt-4 text-center">
            {t('have_acc')}<a href="/signin"> {t('connect')} </a>
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

export default SignUp;
