import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import TroopsList from './TroopsList';
import App from './App';
import Troop from './Troop';
import NotFound from './NotFound';
import BattleField from './BattleField';

import '../css/style.css';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={TroopsList}></Route>
          <Route exact path='/troops/:id' component={Troop}></Route>
          <Route exact path='/battlefield' component={BattleField}></Route>
          <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;