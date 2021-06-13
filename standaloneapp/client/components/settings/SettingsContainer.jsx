import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import SettingsCard from './SettingsCard';
import AddEditCard from './AddEditCard';

const SettingsContainer = ({ settingsArr, setSettingsArr, setPrometheusConnections }) => {
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
            setPrometheusConnections={setPrometheusConnections}
          />
        </Route>
        <Route exact path={`${path}/`}>
          <h3>Settings</h3>
          <div className="settings-container">
            {cardArray}
            <div id="newcards">
              <Link to={`${url}/new`}>
                <div id="newcard" />
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
