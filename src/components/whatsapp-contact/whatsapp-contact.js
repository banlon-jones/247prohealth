import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const WhatsappContact = ({number, message}) => {

  const hreflink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}`
  return (
    <>
      <a href={hreflink} target="_blank" rel="noreferrer" className="p-button bg-green-400 no-underline border-0 p-3">
        <FontAwesomeIcon icon={faPhone} />
        <span className="mx-3">
          {message}
        </span>
      </a>
    </>
  )
}

export default WhatsappContact
