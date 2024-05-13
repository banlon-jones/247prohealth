import React from "react";
import MainNavbar from "../../components/navbar/main-navbar";
import heroImg from "../../assets/images/hero-doctor.png"
import {Button} from "primereact/button";
import {Tag} from "primereact/tag";
import {useNavigate} from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return(
    <div>
      <MainNavbar />
      <div>
        <div className="container">
          <div className="flex flex-row justify-content-between md:flex-nowrap flex-wrap-reverse py-9">
            <div className="text-wrap text-start">
              <div>
                <Tag className="p-4 text-dark bg-white shadow" rounded>healthier tomorrow starts today</Tag>
              </div>
              <div>
                <h1>Empowering Health,</h1>
              </div>
              <div>
                <h1>Empowering Lives</h1>
              </div>
              <div className="my-6">
                <div className="border-left-3 border-primary p-3">
                  <p className="text-wrap">
                    medical descriptions can vary widely depending on the topic being discussed. <br/>they can range from
                    simple explanations suitable for patients to more complex description <br/>intended
                    for healthcare professionals or researchers.
                  </p>
                </div>
              </div>
              <div>
                <Button label="Consult a Specialist Abroad for FREE" size="large" onClick={()=> {navigate("/new-patient/create")}}/>
              </div>
            </div>
            <div>
              <img src={heroImg} className="img-fluid rounded-3" alt="successful medical team" width="500px"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
