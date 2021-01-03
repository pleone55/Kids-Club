import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './utils/store';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Kids from './components/kids/Kids';
import ViewKid from './components/kids/ViewKid';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const App = () => {
  useEffect(() => {
    //Initializes Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <>
        <Router>
          <Switch>
            <Route exact path='/kids' component={Kids} />
              <Redirect exact from='/' to='/kids' />
          </Switch>
        </Router>
        <ViewKid />
      </>
    </Provider>
  )
}

export default App;