import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/home/home";
import SigninPage from "../pages/sign-in/signin-page";
import RecoverPasswordPage from "../pages/recover-password/recoverPasswordPage";
const AppRouter = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/reset-password" element={<RecoverPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
