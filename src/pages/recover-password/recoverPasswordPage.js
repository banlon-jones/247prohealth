import MainNavbar from "../../components/navbar/main-navbar";
import hero from "../../assets/images/successful-medical-team.jpg";
import RecoverPassword from "../../components/recover-password/recover-password";

const recoverPasswordPage = () => {
  return (
    <div>
      <MainNavbar />
      <div>
        <div>
          <div className="md:grid sm:flex justify-content-center">
            <div className="md:col-3">
              <div className="card-body">
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <RecoverPassword />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-9 hide-sm">
              <img src={hero} className="img-fluid"  alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default recoverPasswordPage;

