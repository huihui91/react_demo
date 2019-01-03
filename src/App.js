import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Login from './login/login.jsx'
import ConfirmLoan from './confirmloan/index.jsx'
import SignXloan from './signxloan/index.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/confirmloan" exact component={ConfirmLoan}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signxloan" exact component={SignXloan}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
