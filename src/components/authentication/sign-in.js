import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import facebookLogo from "../../assets/images/logos_facebook.png"
import GoogleAuthButton from "../social-auth-buttons/googleAuthButton";
import {signInUserWithPassword} from "../../services/authService/authService";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

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
      navigate('/dashboard');
    } catch (e) {
      toast.current.show({ severity: 'error', summary: 'Error Login invalid credentials', detail: e.message });
    }

  }
  return (
    <div>
      <Toast ref={toast} />
      <div>
        <h1>Login</h1>
        <p> Access your Account</p>
      </div>
      <div className="py-6 mx-5 text-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            {errors.email &&<small className="text-danger">Email is Required</small>}
            <InputText type="email" placeholder="Email" className="col-12" {...register("email", {required: true})} />
          </div>
          <div className="mb-3">
            { errors.password && <small className="text-danger">password is Required</small>}
            <InputText type="password" className="col-12" placeholder="Password" {...register("password", {required: true})} />
          </div>
          <div>
            <Button className="col-12" label="Login" type="submit" />
          </div>
          <div className="mt-2">
            <a href="/reset-password"> Forgot password ?</a>
          </div>
          <div className="mt-4 text-center">
            I do not have an Account<a href="!#"> Register </a>
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
              <img className="px-3" src={facebookLogo} alt=""/> Login with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
