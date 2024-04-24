import googleLogo from "../../assets/images/google_logo.png";
import {Button} from "primereact/button";
import {logInWithGoogle} from "../../services/authService/authService";

const GoogleAuthButton = () => {
  const handleClick = async () => {
    try {
      const user = await logInWithGoogle()
      console.log(user)
    } catch (e) {

    }
  }
  return (
    <>
      <Button className="shadow-3 w-full flex justify-content-center" text raised onClick={handleClick}>
        <img className="px-3" src={googleLogo} alt=""/> Login with Google
      </Button>
    </>
  )
}

export default GoogleAuthButton
