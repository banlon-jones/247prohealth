import DashboardNavBar from "../../components/navbar/dashboard-navbar";
import {Button} from "primereact/button";

const DashboardPage = () => {
  return (
    <>
      <div>
        <DashboardNavBar />
      </div>
      <div className="pt-5 container text-end">
        <Button label="Add Patient" severity="primary"/>
      </div>
      <div className="p-6">
        <h3 className="text-gray-500">
          Your patient list is empty "click + add patient" to add a patient
        </h3>
      </div>
    </>
  )

}

export default DashboardPage;
