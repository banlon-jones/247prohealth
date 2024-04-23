import MainNavbar from "../../components/navbar/main-navbar";
import SignIn from "../../components/signin/sign-in";
import hero from "../../assets/images/successful-medical-team.jpg"

const SigninPage = () => {
  return (
    <div>
      <MainNavbar />
      <div>
        <div>
          <div className="grid">
            <div className="md:col-3 col-12">
              <div className="card-body">
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <SignIn />
                  </div>
                  <div>
                    <small className="rounded-pill p-3 shadow"> get help, Contact support </small>
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
  );

}

export default SigninPage;
