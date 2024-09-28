import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";
import MainNavbar from "../../components/navbar/main-navbar";

const GetStartPage = () => {
  const navigate = useNavigate();
  const professions = [
    {
      title: "I'm a Doctor",
      description: "If you are a qualified Doctor,",
      url: "/register/doctor"
    },
    {
      title: "I'm a Health Promoter",
      description: "All Health practitioners",
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
          <h3> Select an Option </h3>
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
