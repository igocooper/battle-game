import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import TroopsList from './TroopsList';
import App from './App';
import Troop from './Troop';
import NotFound from './NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={TroopsList}></Route>
          <Route exact path='/troops/:id' component={Troop}></Route>
          <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;