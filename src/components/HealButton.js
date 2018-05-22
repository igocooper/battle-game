import React, {Component} from 'react'
import { Popup } from 'semantic-ui-react';
import { isEmptyObject } from '../utils/common';

class HealButton extends Component {
  state = { healing: 10,
            isOpen: false
          }

  _handleChange = (e)  => {
    const heal = parseInt( e.target.value, 10);

    this.setState({ healing: heal });
  };

  _heal = () => {
    this.props.heal(this.state.healing, this.props.playerId);
    setTimeout( () => {
      this.props.updateUnitsInCombat(this.props.battlefield.players.player1, this.props.battlefield.players.player2);
    }, 4);
  };

  render() {
    const { healing } = this.state;
    const { players } = this.props.battlefield;
    const isDisabled = isEmptyObject(players.player1) || isEmptyObject(players.player2);

    const disabledClass = isDisabled ? 'disabled' : ''
      return (
          <Popup
              trigger={
                <a href="#" 
                  className={`btn-two yellow mini fixed ${disabledClass}`}
                  onClick={() => {
                    if (disabledClass) return
                    this._heal();
                  }}
                
                  > 
                  ❤️ Healing
                </a>}
              flowing
              hoverable
        
          >
            <div>
                <div>Healing: {healing} ❤️</div>
                <input type='range' min={0} max={100} value={healing} onChange={this._handleChange} />
                <div style={{display:'flex', justifyItems: 'center'}}></div>
            </div>
          </Popup>
      )
  }
}

export default HealButton;