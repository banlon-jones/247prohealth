import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { Tag } from "primereact/tag"
import {useTranslation} from "react-i18next";


const ListPatients = ({patients}) => {
  const { t, i18n } = useTranslation();

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
                <small className="text-gray-700">{t('first_name')}</small>
              </div>
              <div className="text-start">
                <div>
                  <strong>{patient?.lastName}</strong>
                </div>
                <small className="text-gray-700">{t('last_name')}</small>
              </div>
              <div className="text-start hide-sm">
                <div>
                  <strong>{patient?.contact}</strong>
                </div>
                <small className="text-gray-700">{t('phone')}</small>
              </div>
              <div className="text-start hide-sm">
                <div>
                  <strong>{patient.address.country}</strong>
                </div>
                <small className="text-gray-700">{t('country')}</small>
              </div>
              <div className="text-start hide-sm">
                <div>
                  <strong>{patient.address.town}</strong>
                </div>
                <small className="text-gray-700">{t('town')}</small>
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
