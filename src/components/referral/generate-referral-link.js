import {Button} from "primereact/button";
import {useState} from "react";
import {Dialog} from "primereact/dialog";
import { getReferralCode } from "../../services/personelService/personelService";
import {getAuth} from "firebase/auth";
import app from "../../config/firebaseConfig";
import {Link} from "react-router-dom";

const GenerateReferralLink = () => {
  const { t, i18n } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [referral_code, setReferral_code] = useState('');
  const referralLink = async () => {
    const code = await getReferralCode(getAuth(app).currentUser?.email);
    setReferral_code(code);
  }
  return (
    <div>
      <Button className="mx-3" severity="secondary" onClick={() => {setVisible(true); referralLink()}}>
        {t('gen_ref_link')}
      </Button>
      <Dialog header="Referral Link" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)}>
        <p className="m-0">
          {t('copy_ref_link')} <br/>
          <Link className="pt-2" to={"/new-patient/" + referral_code} target="_blank"> {window.location.origin}/new-patient/{referral_code} </Link>
        </p>
      </Dialog>
    </div>
  );
}

export default GenerateReferralLink;
