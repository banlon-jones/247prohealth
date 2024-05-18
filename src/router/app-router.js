import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/home/home";
import SigninPage from "../pages/sign-in/signin-page";
import RecoverPasswordPage from "../pages/recover-password/recoverPasswordPage";
import GetStartPage from "../pages/get-started/get-start";
import RegistrationPage from "../pages/registration/registration-page";
import SignupPage from "../pages/signup-page/signup-page";
import {isLoggedIn} from "../guards/auth-guard";
import DashboardPage from "../pages/dashboard/dashboard-page";
import AddPatientPage from "../pages/patient/add-patient-page";
import PatientDetailsPage from "../pages/patient/patient-details-page";

const AppRouter = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<RecoverPasswordPage />} />
        <Route path="/get-started" element={ isLoggedIn()? <GetStartPage /> :  <Navigate to="/signin" /> } />
        <Route path="/register/:profession" element={isLoggedIn()? <RegistrationPage /> : <Navigate to="/signin" /> } />
        <Route path="/dashboard"
               element={isLoggedIn() ? <DashboardPage /> : <Navigate to="/signin"/> }
        />
        <Route path="/patient/:patient_id" element={isLoggedIn()? <PatientDetailsPage /> : <Navigate to="/signin" /> } />
        <Route path="/new-patient/:ref" element={<AddPatientPage /> } />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
