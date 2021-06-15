import React from 'react';
import { Link } from 'react-router-dom';

const SettingsCard = ({ setting }) => {
  return (
    <div id={setting.name} className="settings-card">
      <Link className="settings-detail" to={`/settings/${setting.name}`}>
        <p id="cardname">Name: {setting.name}</p>
        <p id="ipaddress">IP Address: {setting.ipAddress}</p>
        <p id="port">Port: {setting.port}</p>
      </Link>
    </div>
  );
};

export default SettingsCard;
