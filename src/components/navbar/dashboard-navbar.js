import Logo from "../logo/logo";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {logOut} from "../../services/authService/authService";
import app from "../../config/firebaseConfig";
import {getAuth} from "firebase/auth";

const DashboardNavBar = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const menuLeft = useRef(null);
  const logout = async () => {
    await logOut();
    navigate("/signin")
  }

  const menuItems = [
    {
      label: 'Profile',
      url: '/'
    },
    {
      label: 'logout',
      command: () => {
        logout()
      }
    }
  ];
  return(
    <>
      <Toast ref={toast}></Toast>
      <div className="hide-md show-sm bg-gray-50 shadow-3">
        <div className="flex flex-row justify-content-between p-3">
          <div>
            <Button text aria-controls="popup_menu_left" aria-haspopup>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </div>
          <div>
            <div>
              <Menu model={menuItems} popup ref={menuLeft} id="popup_menu_left" />
              <Button text className="py-3" onClick={(event) => menuLeft.current.toggle(event)}>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="px-2"> {getAuth(app).currentUser.email} </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hide-sm container py-2 bg-gray-50 shadow-3">
        <div className="flex flex-row justify-content-between">
          <Logo />
          <div>
            <Menu model={menuItems} popup ref={menuLeft} id="popup_menu_left" />
            <div className="pt-4" onClick={(event) => menuLeft.current.toggle(event)}>
              <span className="bg-primary p-3 rounded">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className="px-2"> {getAuth(app).currentUser.email} </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardNavBar;
