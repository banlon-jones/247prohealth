import {useRef} from "react";
import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";
import MainNavbar from "../../components/navbar/main-navbar";
import SignUpBasicInfo from "../../components/sign-up-basic-information/sign-up-basic-info";
import SignUpQualificationForm from "../../components/sign-up-qualification-form/sign-up-qualification-form";

const RegistrationPage = () => {
  const stepperRef = useRef(null)

  return (
    <>
      <div>
        <MainNavbar />
      </div>
      <div className="container">
        <div>
          <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} orientation="vertical">
            <StepperPanel header="Basic Information">
              <SignUpBasicInfo stepper={stepperRef}/>
            </StepperPanel>
            <StepperPanel header="Qualification">
              <SignUpQualificationForm />
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </>
  )
}

export default RegistrationPage;
