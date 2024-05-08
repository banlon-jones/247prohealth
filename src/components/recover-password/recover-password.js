import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRef, useState} from "react";
import {resetPassword} from "../../services/authService/authService";
import {Toast} from "primereact/toast";
import {useNavigate} from "react-router-dom";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate()

  const reset = async () => {
    try {
      await resetPassword(email)
      toast.current.show({ severity: 'success', summary: 'Successful', detail: "Email sent " });
      navigate("/authentication")
    } catch (e) {
      console.log(e)
      toast.current.show({ severity: 'error', summary: 'Error resetting password', detail: e.message });
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <div>
        <h1>Reset your password</h1>
        <small> Access your Account</small>
      </div>
      <div className="py-6 mx-5 flex flex-column justify-content-center">
        <div className="my-3">
          <InputText type="email" placeholder="Email" className="col-12" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Button className="col-12" label="Send reset password email" onClick={reset} />
        </div>
        <div>
          <p>Remember your password ? <a href="/signin"> Login </a></p>
        </div>
        <div>
          <p>I do not have an account <a href="!#"> register </a></p>
        </div>
      </div>
    </>
  )

}

export default RecoverPassword;
