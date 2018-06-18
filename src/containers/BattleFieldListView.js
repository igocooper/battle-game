import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';


import MainMenu from '../components/MainMenu';
import BattleFieldList  from '../components/BattleFieldList';

class TroopsListView extends Component {
    render() {
      return (
        <Fragment>
            <MainMenu history={this.props.history} menu={this.props.menu} setActiveMenu={this.props.setActiveMenu}/>
            <BattleFieldList {...this.props}/>
        </Fragment>
      )
    }
  }

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        battlefields: state.battlefields
    }
};
  
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

  
export default connect(mapStateToProps, mapDispatchToProps)(TroopsListView);