import Logo from "../logo/logo";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Menu} from "primereact/menu";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {TabMenu} from "primereact/tabmenu";
import {Button} from "primereact/button";

const MainNavbar = () => {
  const navigate = useNavigate();
  const menuLeft = useRef(null);
  const toast = useRef(null);
  const menuItems = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Register for Medical',
      url: '#'
    },
    {
      label: 'Contact Us',
      url: "#"
    }
  ];

  return(
    <>
      <div className="hide-md show-sm">
        <div className="flex flex-row justify-content-between p-3">
          <div>
            <Toast ref={toast}></Toast>
            <Menu model={menuItems} popup ref={menuLeft} id="popup_menu_left" />
            <div className="flex align-items-center">
              <Button text onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup>
                <FontAwesomeIcon icon={faBars} />
              </Button>
              247<span className="text-primary">PRO</span>HEALTH
            </div>
          </div>
          <div>
            <Button label="Sign Up" className="mx-2" onClick={() => navigate("/signup")}/>
            <Button label="Login" onClick={() => navigate("/signin")} outlined/>
          </div>
        </div>
      </div>
      <div className="hide-sm container py-2">
        <div className="flex flex-row justify-content-between">
          <Logo />
          <div className="card">
            <TabMenu model={menuItems} />
          </div>
          <div>
            <Button label="Sign up" href="/get-started" onClick={() => navigate("/signup")} raised className="mx-4"/>
            <Button label="Login" onClick={() => navigate("/signin")} outlined raised/>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainNavbar;
