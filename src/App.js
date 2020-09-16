import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import LoginPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import FindPWPage from "./Pages/FindPWPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
      <HashRouter>
        <Switch>
          <Route path={'/logIn'} component={LoginPage}/>
          <Route path={'/register'} component={RegisterPage}/>
          <Route path={'/findPW'} component={FindPWPage}/>
          <Route path={'/home'} component={HomePage}/>
          <Redirect path={'/'} to={'/logIn'}/>
        </Switch>
      </HashRouter>
  );
}

export default App;
