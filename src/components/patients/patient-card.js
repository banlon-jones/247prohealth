import patientAvatar from "../../assets/images/patient-avatar.png"
const PatientCard = ({patient}) => {
  return(
    <div className="p-6 rounded shadow">
      <div>
        <img src={patientAvatar} alt="avatar" className="img-fluid w-5" />
      </div>
      <div className="text-start py-2">
        <div className="py-2">
          First Name : {patient?.firstName}
        </div>
        <div className="py-2">
          Last Name : {patient?.lastName}
        </div>
        <div className="py-2">
          Email : {patient?.email}
        </div>
        <div className="py-2">
          Date of Birth : {patient?.dob?.split("T")?.shift()}
        </div>
        <div className="py-2">
          Whatsapp : {patient?.contact}
        </div>
        <div className="border-1 border-dashed rounded p-3">
          <h4 className="text-gray-500">
            Address
          </h4>
          <div>
            Country: {patient?.address?.country}
          </div>
          <div className="my-3">
            City/Town: {patient?.address?.town}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
