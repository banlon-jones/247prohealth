import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { Tag } from "primereact/tag"


const ListPatients = ({patients}) => {
  return(
    <>
      <div>
        {
          patients.map((patient) => {return (
            <div key={patient.id} className="mt-3 py-4 container rounded shadow-3 flex flex-row flex-wrap justify-content-between">
              <div className="text-start">
                <div>
                  <strong>{patient?.firstName}</strong>
                </div>
                <small className="text-gray-700">First Name</small>
              </div>
              <div className="text-start">
                <div>
                  <strong>{patient?.lastName}</strong>
                </div>
                <small className="text-gray-700">Last Name</small>
              </div>
              <div className="text-start hide-sm">
                <div>
                  <strong>{patient?.contact}</strong>
                </div>
                <small className="text-gray-700">Phone</small>
              </div>
              <div className="text-start hide-sm">
                <div>
                  <strong>{patient.address.country}</strong>
                </div>
                <small className="text-gray-700">Country</small>
              </div>
              <div className="text-start hide-sm">
                <div>
                  <strong>{patient.address.town}</strong>
                </div>
                <small className="text-gray-700">City/Town</small>
              </div>
              <div>
                {patient?.status === 'consulted' ? <Tag severity="success" value={patient?.status} rounded></Tag> : <Tag severity="warning" value="awaiting" rounded></Tag>}
              </div>
              <div className="text-start">
                <Link to={"/patient/" + patient.id}>
                  <FontAwesomeIcon icon={faBars} />
                </Link>
              </div>
            </div>
          )})
        }
      </div>
    </>
  );
}

export default ListPatients;
