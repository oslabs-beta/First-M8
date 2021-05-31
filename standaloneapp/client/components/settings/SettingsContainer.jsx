import React, { useState, useEffect } from "react";
import SettingsCard from "./SettingsCard";

const DashboardContainer = () => {
  const [clusterArray, setClusterArray] = useState(() => []);

  return (
    <div className="dashboard-container">
      <div>Settings Container</div>
    </div>
  );
};

export default DashboardContainer;
