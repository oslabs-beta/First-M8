
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {render} from "react-dom";

import {BrowserRouter} from 'react-router-dom'

//add reactDOM Render
//< is the problem no matter what is first
//need to fix..
ReactDOM.render(
  <BrowserRouter> 
    <App /></BrowserRouter>,
    document.getElementById('root')
);

//https://stackoverflow.com/questions/20905227/reactjs-unexpected-token-error
//might need webpack.

//css loader
//style 

