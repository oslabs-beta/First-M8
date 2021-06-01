import React, { useState, useEffect } from "react";
import SettingsCard from "./SettingsCard";
import AddCard from "./AddCard";

const DashboardContainer = () => {
  const [clusterArray, setClusterArray] = useState(() => []);

  //test card cases
  useEffect(() => {
    setClusterArray([
      {
        name: "cluster 1",
        ipAddress: "162.168.02.01",
        port: 3000,
      },
      {
        name: "cluster 2",
        ipAddress: "161.165.3.01",
        port: 5000,
      },
    ]);
  }, []);

  const cardArray = clusterArray.map((cluster) => {
    return <SettingsCard cluster={cluster} />;
  });

  return (
    <div className="settings">
      <h3>Settingssdasda</h3>
      <div className="settings-container">{cardArray}</div>
      <div>
        <img src='../assets/logo'></img>
      </div>
    </div>
  );
};

export default DashboardContainer;
