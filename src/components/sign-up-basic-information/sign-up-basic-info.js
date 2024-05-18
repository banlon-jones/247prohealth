import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {registerNewPersonel} from "../../services/personelService/personelService";
import {countries} from "../../constants/specialties";
import {Dropdown} from "primereact/dropdown";
import {useState} from "react";

const SignUpBasicInfo = ({stepper}) => {
  const [country, setCountry] = useState()
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (country.name !== "India") {
        data = {...data,country: country.name, isPromoter: true, isSpecailist: false}
      }else {
        data = {...data,country: country.name, isPromoter: false, isSpecailist: true}
      }
      await registerNewPersonel({...data, email: JSON.parse(localStorage.getItem("user")).email})
      stepper.current.nextCallback()
    }catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div className="text-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2">
            <label>First name</label>
            <InputText placeholder="First Name" className="w-full" {...register("firstName", {required: true})}/>
            { errors.firstName && <small className="text-danger">email is Required</small>}
          </div>
          <div className="py-2">
            <label>Last Name</label>
            <InputText placeholder="Last Name" className="w-full" {...register("lastName", {required: true})}/>
            { errors.lastName && <small className="text-danger">last name is Required</small>}
          </div>
          <div className="py-2">
            <label>Date of Birth</label>
            <Calendar placeholder="Date of Birth" dateFormat="dd/mm/yy" className="w-full" {...register("dateOfBirth", {required: true})} />
            { errors.dateOrBirth && <small className="text-danger">date of birth is Required</small>}
          </div>
          <div className="py-2">
            <label>Country</label>
            <Dropdown value={country} onChange={(e) => setCountry(e.value)} options={countries} optionLabel="name"
                      placeholder="Country" className="w-full" />
          </div>
          <div className="py-2">
            <label>Address</label>
            <InputText placeholder="Address" className="w-full" {...register("address", {required: true})}/>
            { errors.lastName && <small className="text-danger">address is Required</small>}
          </div>
          <div className="py-2">
            <Button label="Save and Continue"  type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpBasicInfo;
