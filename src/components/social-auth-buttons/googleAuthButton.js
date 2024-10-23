import googleLogo from "../../assets/images/google_logo.png";
import {Button} from "primereact/button";
import {logInWithGoogle} from "../../services/authService/authService";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await logInWithGoogle()
      navigate('/dashboard');
    } catch (e) {

    }
  }
  const { t, i18n } = useTranslation();

  return (
    <>
      <Button className="shadow-3 w-full flex justify-content-center" text raised onClick={handleClick}>
        <img className="px-3" src={googleLogo} alt=""/> {t('login_with')} Google
      </Button>
    </>
  )
}

export default GoogleAuthButton
