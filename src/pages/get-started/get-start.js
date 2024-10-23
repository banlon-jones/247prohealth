import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";
import MainNavbar from "../../components/navbar/main-navbar";
import {useTranslation} from "react-i18next";

const GetStartPage = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const professions = [
    {
      title: t('am_doc'),
      description: t('if_you_doc'),
      url: "/register/doctor"
    },
    {
      title: t("health_promo"),
      description: t("health_prac"),
      url: "/register/nurse"
    },
  ]

  return(
    <>
      <div>
        <MainNavbar />
      </div>
      <div className="mt-8 flex flex-row justify-content-center">
        <Card className="border-0 shadow-1 w-25rem">
          <h3>{t('selc_option')} </h3>
          {
            professions.map(
              (item, index) => (
                <div className="mb-3" key={index}>
                  <Card title={item.title} className="text-start" onClick={() => navigate(item.url)}>
                    <p className="m-0">
                      {item.description}
                    </p>
                  </Card>
                </div>
              )
            )
          }
        </Card>
      </div>
    </>
  )
}

export default GetStartPage;
