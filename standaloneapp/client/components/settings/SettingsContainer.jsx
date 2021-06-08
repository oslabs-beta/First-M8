import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import SettingsCard from "./SettingsCard";
import AddEditCard from "./AddEditCard";

const SettingsContainer = () => {
  const [clusterArray, setClusterArray] = useState(() => [
    {
      name: "cluster-1",
      ipAddress: "162.168.02.01",
      port: 3000,
    },
    {
      name: "cluster-2",
      ipAddress: "161.165.3.01",
      port: 5000,
    },
  ]);
  const { path, url } = useRouteMatch();

  const cardArray = clusterArray.map((cluster) => {
    return (
      <SettingsCard
        key={`cluster settings ${cluster.name}`}
        cluster={cluster}
      />
    );
  });

  return (
    <div className="settings">
      <Switch>
        <Route path={`${path}/:name`}>
          <AddEditCard
            clusterArray={clusterArray}
            setClusterArray={setClusterArray}
          />
        </Route>
        <Route exact path={`${path}/`}>
          <h3>Settings</h3>
          <div className="settings-container">
            {cardArray}
            <div id="newcards">
              <Link to={`${url}/new`}>
                <div id="newcard"></div>
                {/* <img src="../assets/first-m8-logo.png"></img> */}
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default SettingsContainer;
