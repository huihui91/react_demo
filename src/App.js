import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import Login from './login/login.jsx'
import ConfirmLoan from './confirmloan/index.jsx'
import SignXloan from './signxloan/index.jsx'
import Done from './done/index.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/confirmloan" exact component={ConfirmLoan}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signxloan" exact component={SignXloan}></Route>
          <Route path="/done" exact component={Done}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
