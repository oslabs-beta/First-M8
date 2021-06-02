import React from "react";
import { Link } from "react-router-dom";

const SettingsCard = ({ cluster }) => {

  return (
    <div id={cluster.name} className="settings-card">
      <Link to={`/settings/${cluster.name}`}>
        <p id="cardname">Name: {cluster.name}</p>
        <p id="ipaddress">IP Address: {cluster.ipAddress}</p>
        <p id="port">Port: {cluster.port}</p>
      </Link>
    </div>
  );
};

export default SettingsCard;
