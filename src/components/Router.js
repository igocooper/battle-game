import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {Fragment} from 'react';
import TroopsListView from '../containers/TroopsListView';
import App from './App';
import Troop from './Troop';
import NotFound from './NotFound';
import BattleFieldView from '../containers/BattleFieldView';
import TroopView from '../containers/TroopView';

import '../css/style.css';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={TroopsListView}></Route>
          <Route exact path='/troops' component={TroopsListView}></Route>
          <Route exact path='/troops/:id' component={TroopView}></Route>
          <Route exact path='/battlefield' component={BattleFieldView}></Route>
          <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;