import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';

import MainMenu from '../components/MainMenu';
import Troop  from '../components/Troop';

class TroopView extends Component {
    render() {
      return (
        <Fragment>
            <MainMenu history={this.props.history} menu={this.props.menu} setActiveMenu={this.props.setActiveMenu}/>
            <Troop {...this.props}/>
        </Fragment>
      )
    }
  }

const mapStateToProps = (state) => {
    return {
        troops: state.troops,
        menu: state.menu
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

  
export default connect(mapStateToProps, mapDispatchToProps)(TroopView);