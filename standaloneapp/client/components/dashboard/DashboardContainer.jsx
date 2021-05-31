import React from "react";
import history from "./dashboardHistory";


const DashboardContainer = () => {
  return(
    <div>
      <button id="new-dashboard-element" onClick={() => history.push("/newdashboardelement")}>New Dashboard Element</button>
    </div>
  )
}

export default DashboardContainer;