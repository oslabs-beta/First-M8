import React, { useState, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { BrowserRouter as Router, Link } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const App = () => {
  /*
  initializes state of all charts to display on main dashboard page,
  Prometheus connections to list in drop down top of app,
  and the selected instance to use to query Prometheus in other components
  */
  const [allCharts, setAllCharts] = useState(() => []);
  const [prometheusConnections, setPrometheusConnections] = useState(() => []);
  const [prometheusInstance, setPrometheusInstance] = useState(() => {});

  /*
  retrieves all existing charts from database to display on
  main dashboard page
  */
  const getAllCharts = async (instanceName) => {
    await fetch(`/dashboard/${instanceName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data[0] !== undefined) {
          setAllCharts(data[0].display);
        }
      });
  };

  /*
  retrieves all existing Prometheus connections from database
  to list in drop down at top of app
  */
  const getAllPrometheusInstances = async () => {
    const connectionNames = [<option value="select prometheus instance">Select Prometheus Instance</option>];
    await fetch('/dashboard/connect/all')
      .then((response) => response.json())
      .then((response) => {
        response.forEach((connection) => {
          connectionNames.push(
            <option value={connection.name}>{connection.name}</option>,
          );
        });
        setPrometheusConnections(connectionNames);
      });
  };

  /*
  handles change on Prometheus connection selector drop down:
  retrieves settings data for particular connection name and
  invokes funciton to get all charts passing in the particular
  connection naem
  */
  const selectPrometheusInstance = async (event) => {
    setAllCharts([]);
    await fetch(`/dashboard/connect/${event.target.value}`)
      .then((response) => response.json())
      .then((response) => {
        setPrometheusInstance(response);
        console.log(response);
        getAllCharts(response.name);
      });
  };

  useEffect(() => {
    getAllPrometheusInstances();
  }, []);

  return (
    <div className="app">
      <label>Prometheus Instance: </label>
      <select onChange={selectPrometheusInstance}>
        {prometheusConnections}
      </select>
      <Router>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/history">History</Link>
        </nav>
        <MainRoutes
          allCharts={allCharts}
          setAllCharts={setAllCharts}
          prometheusInstance={prometheusInstance}
          setPrometheusInstance={setPrometheusInstance}
          prometheusConnections={prometheusConnections}
          setPrometheusConnections={setPrometheusConnections}
        />
      </Router>
    </div>
  );
};

export default App;
