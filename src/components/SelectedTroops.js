import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';

import { Tab } from 'semantic-ui-react'
import Unit from './Unit';

class SelectedTroops extends Component {
    render() {

        const panes = Object.entries(this.props.troops).map( ( [key, troop] ) => {
            return {
                menuItem: troop.name,
                render: () => (
                    <Tab.Pane attached='false' as='div' className='selected-troops__tab'>
                        {troop.units.map( (unit, index) => {
                           return (
                            <Unit key={index} {...unit} {...this.props} unit={unit}/>
                           )
                        })}
                    </Tab.Pane>
                )
            }
        });

        return (
            <div className='selected-troops'>
                <Tab 
                    menu={{ color: 'grey', inverted: true}}
                    panes={panes} 
                />
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        troops: state.troops,
        battlefield: state.battlefield
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTroops);
