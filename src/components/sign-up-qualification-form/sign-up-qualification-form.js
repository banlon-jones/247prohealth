import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {certificates, experienceLevels, specialties} from "../../constants/specialties";
import {useState} from "react";
import {updateDoctor} from "../../services/doctorService/doctorService";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {useNavigate} from "react-router-dom";

const SignUpQualificationForm = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [specialty, setSpecialty] = useState(null);

  const onSubmit = async () => {
    const data = {
      experience: experience.name,
      highestCertificate: certificate.name,
      specialties: specialty.map((item) => item.name)
    }
    //
    await updateDoctor(data, getAuth(app).currentUser.email);
    navigate("/dashboard");
  }

  return (
    <div className="text-start">
      <form>
        <div className="py-2">
          <label> Experience </label>
          <Dropdown value={experience}
                    onChange={(e) => setExperience(e.value)}
                    options={experienceLevels} optionLabel="option"
                    checkmark={true}
                    placeholder="select your Experience Level" className="w-full"/>
        </div>
        <div className="py-2">
          <label> Highest certificate </label>
          <Dropdown value={certificate} onChange={(e) => setCertificate(e.value)} options={certificates} optionLabel="name"
                    placeholder="select your Highest certificate" className="w-full" />
        </div>
        <div className="py-2">
          <label> Specialty <small>(3 max)</small></label>
          <MultiSelect value={specialty} onChange={(e) => setSpecialty(e.value)} options={specialties} optionLabel="name" display="chip"
                       placeholder="Select your specialties" maxSelectedLabels={3} className="w-full" filter />

        </div>
      </form>
      <div className="py-2">
        <Button label="Save and Continue" onClick={onSubmit} />
      </div>
    </div>
  )
}

export default SignUpQualificationForm;
