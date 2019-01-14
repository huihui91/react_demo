import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import Login from './login/login.jsx'
import ConfirmLoan from './confirmloan/index.jsx'
import SignXloan from './signxloan/index.jsx'
import Done from './done/index.jsx'
import store from './Redux/Store/index.jsx'
import demoRedux from './demoRedux/index.jsx'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login"  component={Login}></Route>
          <Route path="/confirmloan"  component={ConfirmLoan}></Route>
          <Route path="/signxloan"  component={SignXloan}></Route>
          <Route path="/done"  component={Done}></Route>
          <Route path="/done"  component={Done}></Route>
            <Route path="/demoRedux" component={demoRedux}></Route>
          <Route component={Login} />
        </Switch>
      </Router>
      </Provider>
    );
  }
}

export default App;
