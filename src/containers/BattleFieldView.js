import React, { Component, Fragment } from 'react';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';

import BattleField from '../components/BattleField';
import MainMenu from '../components/MainMenu';
import { connect } from 'react-redux';

class BattleFieldView extends Component {
    render() {
        return ( 
        <Fragment>     
            <MainMenu history={this.props.history} menu={this.props.menu} setActiveMenu={this.props.setActiveMenu}/>
            <BattleField {...this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(BattleFieldView);

