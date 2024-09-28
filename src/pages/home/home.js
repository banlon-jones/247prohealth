import React from "react";
import MainNavbar from "../../components/navbar/main-navbar";
import heroImg from "../../assets/images/hero.jpeg"
import {Button} from "primereact/button";
import {Tag} from "primereact/tag";
import {useNavigate} from "react-router-dom";
import hiamsLogo from "../../assets/images/hiams-logo.png"
import WhatsappContact from "../../components/whatsapp-contact/whatsapp-contact";
const Home = () => {
  const navigate = useNavigate();
  return(
    <div>
      <MainNavbar />
      <div>
        <div className="container">
          <div className="flex flex-row justify-content-between md:flex-nowrap flex-wrap py-9">
            <div className="text-wrap text-start">
              <div>
                <Tag className="p-4 text-dark bg-white shadow" rounded>healthier tomorrow starts today</Tag>
              </div>
              <div>
                <h1>For Health Professionals Promoters & Patients</h1>
              </div>

              <div className="my-6">
                <div className="border-left-3 border-primary p-3">
                  <p className="text-wrap">
                    Giving Patients Access to the Best Healthcare Specialists Worldwide
                  </p>
                </div>
              </div>
              <div>
                <Button label="Consult a Specialist Abroad for FREE" size="large" onClick={()=> {navigate("/new-patient/create")}}/>
              </div>
              <div className="mt-4">
                <WhatsappContact number="+2349067545922" message="contact support for more imformation" />
              </div>
            </div>
            <div>
              <img src={heroImg} className="img-fluid rounded-3 shadow mt-4" alt="successful medical team" width="500px"/>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="p-8 bg-primary">
          <div className="flex flex-row flex-wrap justify-content-between">
            <div>
              <h2>Our Partner</h2>
            </div>
            <div>
              <div className="flex flex-row">
                <div>
                  <img src={hiamsLogo} alt="hiams logo"/>
                </div>
                <div className="text-start">
                  <h3>HIAMS</h3>
                  <div>
                    The Higher Institute of Applied Medical Sciences (HIAMS).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
