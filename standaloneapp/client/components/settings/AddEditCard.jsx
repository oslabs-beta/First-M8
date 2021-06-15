import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { nameHelper, ipHelper, portHelper } from './settingsHelper';

const AddEditCard = ({ settingsArr, setSettingsArr, setPrometheusConnections }) => {
  const { name } = useParams();
  const history = useHistory();
  const [thisSetting, setThisSetting] = useState(() => {
    if (name !== 'new') {
      for (const el of settingsArr) {
        if (el.name === name) return el;
      }
    }
    return {
      name: '',
      ipAddress: '',
      port: 3000,
    };
  });
  const [errMsgNew, setErrMsgNew] = useState(() => false);
  const [errMsgIP, setErrMsgIP] = useState(() => false);
  const [errMsgPort, setErrMsgPort] = useState(() => false);

  async function handleSumbit(e) {
    e.preventDefault();
    const nameErr = nameHelper(thisSetting.name);
    const ipErr = ipHelper(thisSetting.ipAddress);
    const portErr = portHelper(thisSetting.port);
    if (nameErr || ipErr || portErr) {
      if (nameErr) setErrMsgNew(true);
      if (ipErr) setErrMsgIP(true);
      if (portErr) setErrMsgPort(true);
      return;
    } else {
      if (name === 'new') {
        const connectionNames = [<option value="select prometheus instance">Select Prometheus Instance</option>];
        await fetch('/settings/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(thisSetting),
        })
          .then((res) => res.json())
          .then((result) => {
            result.settings.forEach((connection) => {
              connectionNames.push(
                <option value={connection.name}>{connection.name}</option>,
              );
            });
            setPrometheusConnections(connectionNames);
            setSettingsArr(result.settings);
          })
          .catch((e) => console.log(e));
      } else {
        const connectionNames = [<option value="select prometheus instance">Select Prometheus Instance</option>];
        await fetch(`/settings/${name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(thisSetting),
        })
          .then((res) => res.json())
          .then((result) => {
            // const newArray = settingsArr.filter((el) => el.name !== name);
            result.settings.forEach((connection) => {
              connectionNames.push(
                <option value={connection.name}>{connection.name}</option>,
              );
            });
            setPrometheusConnections(connectionNames);
            setSettingsArr(result.settings);
          })
          .catch((e) => console.log(e));
      }
      history.push('/settings');
      return;
    }
  }

  function handleChange(e) {
    let updatedCluster = { ...thisSetting };
    if (e.target.id === 'name') {
      updatedCluster = { ...updatedCluster, name: e.target.value };
    } else if (e.target.id === 'ipaddress') {
      updatedCluster = { ...updatedCluster, ipAddress: e.target.value };
    } else if (e.target.id === 'port') {
      updatedCluster = { ...updatedCluster, port: e.target.value };
    }
    setThisSetting(updatedCluster);
    return;
  }

  function handleDelete(e) {
    const connectionNames = [<option value="select prometheus instance">Select Prometheus Instance</option>];
    fetch(`/settings/${name}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thisSetting),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("addedit", result.settings);
        result.settings.forEach((connection) => {
          connectionNames.push(
            <option value={connection.name}>{connection.name}</option>,
          );
        });
        setPrometheusConnections(connectionNames);
        setSettingsArr(result.settings);
        history.push('/settings');
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="add-edit-card">
      <h2>Add/Edit Prometheus Instance</h2>
      <form className="settings-form" onSubmit={(e) => handleSumbit(e)}>
        <div>
          <label className="settings-label" htmlFor="name">Name </label>
          <input
            className="settings-input"
            type="text"
            id="name"
            placeholder="Instance Name"
            required
            value={thisSetting.name}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label className="settings-label" htmlFor="ipaddress">IP Address </label>
          <input
            className="settings-input"
            type="text"
            id="ipaddress"
            placeholder="192.168.0.1"
            required
            value={thisSetting.ipAddress}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label className="settings-label" htmlFor="port">Port </label>
          <input
            className="settings-input"
            type="text"
            id="port"
            placeholder="3000"
            required
            value={thisSetting.port}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <button className="form-buttons" id="submit" type="submit">Submit</button>
          <button className="form-buttons" id="delete" onClick={(e) => handleDelete(e)}>Delete</button>
        </div>
      </form>
      {errMsgNew ? (
        <p>Please make sure the name for the server is not 'new'</p>
      ) : null}
      {errMsgIP ? (
        <p>Please make sure your IP is in the correct format</p>
      ) : null}
      {errMsgPort ? <p>Please make sure the port is valid</p> : null}
    </div>
  );
};

export default AddEditCard;
