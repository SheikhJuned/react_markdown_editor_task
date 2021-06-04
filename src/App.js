import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown'
import MarkDownScreen from "./components/MarkDownScreen";
import Header from "./components/Header";
import Box from '@material-ui/core/Box';
import MenuBar from "./components/MenuBar";
import React, {useEffect, useState} from "react";
import LogInScreen from "./components/screen/LogInScreen";
import LogOutScreen from "./components/screen/LogOutScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {LoginContext} from "./contexts";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";




const axios = require('axios').default;
function App() {
  const [jwt,setjwt]=useState(localStorage.getItem('jwt'))



  const setJwtFunc=(jwt)=>{
    localStorage.setItem('jwt',jwt)
    setjwt(jwt)
  }

  const removeJwt=()=>{
    localStorage.removeItem('jwt')
    setjwt(null)
  }




  return (
      <LoginContext.Provider value={{jwt,removeJwt,setJwtFunc}}>

        <Router>


              {jwt!==null ?
                  <Switch>
                  <Route path="/">
                    <LogInScreen/>
                  </Route>
                  </Switch>
                  :
              <Switch>
              <Route path="/signup">
                <SignUp/>
              </Route>
              <Route path="/">
                <LogIn/>
              </Route>
              </Switch>
              }

        </Router>



    {/*<LogOutScreen/>*/}
    </LoginContext.Provider>

  );





}

export default App;
