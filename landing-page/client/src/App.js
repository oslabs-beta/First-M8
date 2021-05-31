
import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Team from './components/Team';
import styles from './scss/styles.scss';
import {Route, Switch} from 'react-router'
//Main body of the frontend.

const App = () => {

  //render Team page logic  
  const renderTeam = () => {
      return <Team />
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-column">
        </div>
      </header>
        <NavBar/>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/team" render={renderTeam}/>
        </Switch>

    </div>
  ) 
}

export default App;

