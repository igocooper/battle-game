import React, {Component} from 'react'
import { Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';

class HealButton extends Component {
  state = { healing: 10 }

  handleChange = (e)  => {
    const heal = parseInt( e.target.value, 10);

    this.setState({ healing: heal });
  };

  heal = () => {
    this.props.heal(this.state.healing, this.props.playerId);
    setTimeout( () => {
      this.props.updateUnitsInCombat(this.props.battlefield.players.player1, this.props.battlefield.players.player2);
    }, 4);
  };

  render() {
    const { healing } = this.state;
      return (
          <Popup
              trigger={
                <a href="#" 
                  className="btn-two yellow mini" 
                  onClick={this.heal}
                  > 
                  ❤️ Healing
                </a>}
              flowing
              hoverable
          >
            <div>
              <div>Healing: {healing} ❤️</div>
              <input type='range' min={0} max={100} value={healing} onChange={this.handleChange} />
              <div style={{display:'flex', justifyItems: 'center'}}>
               
              </div>
            </div>
          </Popup>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealButton);