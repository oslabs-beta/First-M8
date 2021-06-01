import React from "react";
import history from "./dashboardHistory";
import DashboardRoutes from "./DashboardRoutes";


const DashboardContainer = () => {
  return(
    <div>
      <button id="new-dashboard-element" onClick={() => history.push("/newdashboardelement")}>New Dashboard Element</button>
      <DashboardRoutes />
    </div>
  )
}

export default DashboardContainer;