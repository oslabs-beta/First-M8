import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainRoutes from "./MainRoutes";

const App = () => {
  const [prometheusConnections, setPrometheusConnections] = useState(() => []);
  const [prometheusInstance, setPrometheusInstance] = useState(() => {});

  const getAllPrometheusInstances = async () => {
    const connectionNames = [<option value=""></option>];
    await fetch("/dashboard/connect/all")
      .then(response => response.json())
      .then(response => {
        response.forEach(connection => {
          connectionNames.push(
            <option value={connection.name}>{connection.name}</option>
          );
        });
        setPrometheusConnections(connectionNames);
      });  
  }


  const selectPrometheusInstance = async (event) => {
    await fetch(`/dashboard/connect/${event.target.value}`)
      .then(response => response.json())
      .then(response => {
        setPrometheusInstance(response);
      });
  }
  
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
          prometheusInstance={prometheusInstance}
          setPrometheusInstance={setPrometheusInstance}
        />
      </Router>
    </div>
  );
};

export default App;
