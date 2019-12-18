import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivateRoute from './../components/PrivateRoute';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/sign_in' component={SignIn}/>
          <Route path='/sign_up' component={SignUp}/>
          <PrivateRoute path='/'>
            <Home/>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
