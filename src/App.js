import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import LoginPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import FindPWPage from "./Pages/FindPWPage";
import DiscussListPage from "./Pages/DiscussListPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path={'/logIn'} component={LoginPage}/>
          <Route path={'/register'} component={RegisterPage}/>
          <Route path={'/findPW'} component={FindPWPage}/>
          <Route path={'/home'} component={HomePage}/>
          <Redirect path={'/'} to={'/logIn'}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;