import React from 'react';

const SettingsCard = ({ cluster }) => {

  function handleClick(e){
    
  }

  return (
    <div id={cluster.name} className='settings-card' onClick={((e) => handleClick(e))}>
      <p id='cardname'>Name: {cluster.name}</p>
      <p id='ipaddress'>IP Address: {cluster.ipAddress}</p>
      <p id='port'>Port: {cluster.port}</p>
    </div>
  );
}

export default SettingsCard;