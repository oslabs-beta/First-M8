import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import SettingsCard from "./SettingsCard";
import AddEditCard from "./AddEditCard";

const SettingsContainer = ({ settingsArr, setSettingsArr }) => {
  const { path, url } = useRouteMatch();

  const cardArray = settingsArr.map((setting) => {
    return (
      <SettingsCard
        key={`settings card ${setting.name}`}
        setting={setting}
      />
    );
  });

  return (
    <div className="settings">
      <Switch>
        <Route path={`${path}/:name`}>
          <AddEditCard
            settingsArr={settingsArr}
            setSettingsArr={setSettingsArr}
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
