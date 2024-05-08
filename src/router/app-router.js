import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../pages/home/home";
import SigninPage from "../pages/sign-in/signin-page";
import RecoverPasswordPage from "../pages/recover-password/recoverPasswordPage";
import GetStartPage from "../pages/get-started/get-start";
import RegistrationPage from "../pages/registration/registration-page";
import SignupPage from "../pages/signup-page/signup-page";
import {isLoggedIn} from "../guards/auth-guard";
import DashboardPage from "../pages/dashboard/dashboard-page";
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
        <Route path="/dashboard" element={isLoggedIn() ? <DashboardPage /> : <Navigate to="/signin"/> } />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
