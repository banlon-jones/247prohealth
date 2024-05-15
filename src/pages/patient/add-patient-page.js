import {useForm} from "react-hook-form";
import MainNavbar from "../../components/navbar/main-navbar";
import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {InputTextarea} from "primereact/inputtextarea";
import {useNavigate, useParams} from "react-router-dom";
import {newPatient} from "../../services/patientService/patientService";
import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import imgUrl from "../../assets/images/flat-doc.jpg";
import {Calendar} from "primereact/calendar";
import {countries} from "../../constants/specialties";
import {Dropdown} from "primereact/dropdown";
import {UniqueCharOTP} from "unique-string-generator";

const AddPatientPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [patientId, setPatientId] = useState('');
  const {ref} = useParams();
  const auth = getAuth(app);
  const {
    register,
    handleSubmit,
    formState: {errors}, reset} = useForm();

  const onSubmit = async (data) => {
    const date = new Date();
    const dat = new Date(data?.dateOfBirth)
    try {
      const patient = {
        ...data,
        dob: dat.toISOString(),
        address: {
          country: selectedCountry?.name,
          town: data.town
        },
        createdAt: date.toISOString(),
        referral: ref
      }
      console.log(patient)
      delete patient.town
      const docRef = await newPatient(patient);
      setPatientId(docRef.id);
      setVisible(true);
      reset();
    } catch (e) {
    }
  }

  const handleOkClick = () => {
    navigate(auth?.currentUser?.email ? "/dashboard" : "/")
  }

  return(
    <>
      {auth?.currentUser?.email ? <DashboardNavBar /> : <MainNavbar />}
      <div>
        <h2>
          Patient Sign Up
        </h2>
        <div className="py-6 mx-5 text-start">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label>First Name</label>
              <InputText type="text" placeholder="First Name" className="col-12" {...register("firstName", {required: true})} />
              {errors.firstName &&<small className="text-danger">name is Required</small>}
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <InputText type="text" className="col-12" placeholder="Last Name" {...register("lastName", {required: true})} />
              { errors.lastName && <small className="text-danger">name is Required</small>}
            </div>
            <div className="mb-3">
              <label>Date of Birth</label>
              <Calendar className="w-full" placeholder="Date of Birth" {...register("dateOfBirth", {required: true})} />
            </div>
            <div className="my-3">
              <label>Email</label>
              <InputText type="email" placeholder="Email" className="col-12" {...register("email", {required: false})} />
            </div>
            <div className="mb-3">
              <label>Whatsapp contact</label>
              <InputText type="tel" className="col-12" placeholder="Example +237 670070070" {...register("contact", {required: true})} />
              { errors.contact && <small className="text-danger">whatsapp contact is Required</small>}
            </div>
            <div className="mb-3 p-5 border-1 rounded border-dashed">
              <h3>
                Patient's Address
              </h3>
              <small className="text-gray-600"> Enter patients current Address</small>
              <div className="my-3">
                <label>Country</label>
                <div>
                  <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name"
                            placeholder="Select your country" className="w-full" />
                </div>
              </div>
              <div className="my-3">
                <label>Town</label>
                <InputText type="text" className="col-12" placeholder="town" {...register("town", {required: true})} />
                { errors.town && <small className="text-danger">town is Required</small>}
              </div>
            </div>
            <div className="my-3">
              <label>Describe Signs and Symptoms</label>
              <div>
                <InputTextarea className="col-12" {...register("description", {required: true})} rows={5} cols={30} />
              </div>
              { errors.description && <small className="text-danger">address is Required</small>}
            </div>
            <div>
              <Button label="Save and Continues" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div>
        <Dialog header="Patient Successfully added" visible={visible} style={{ width: '90vw' }} onHide={() => handleOkClick()}>
          <div className="text-center">
            <div>
              <img className="img-fluid" src={imgUrl} alt="flat doc" />
            </div>
            <div>
              Your patient record has been successfully created <br/>
              <strong>your Patient ID: {patientId}</strong><br/>
              Our specialists will reach out to you shortly
            </div>
            <div className="text-center p-5">
              <Button label="Confirm" severity="primary" onClick={() => handleOkClick()} />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );

}

export default AddPatientPage;
