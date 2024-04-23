import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/home/home";
import SigninPage from "../pages/sign-in/signin-page";
const AppRouter = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
