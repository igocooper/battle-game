import React, {Component} from 'react'
import { Popup, Button , Label, Icon } from 'semantic-ui-react'
import { isEmptyObject } from '../utils/common';

class ModifyButton extends Component {
  render() {
    const { players } = this.props.battlefield;
    const disabledClass = isEmptyObject(players.player1) || isEmptyObject(players.player2) ? 'disabled' : '';
    const { player } = this.props;
      return (
          <Popup
              trigger={
                <a href="#" 
                    className={`btn-two cyan mini fixed ${disabledClass}`}
                    disabled={isEmptyObject(players.player1) || isEmptyObject(players.player2)} 
                    onClick={ () => {
                    if (disabledClass) return;  
                }}>
                    ⚙️ modify
                </a>
              }
              on='click'
              flowing
              hoverable
          >
            <div className="modification-popup">
              <div>
                <Icon name="add circle" color='green'  onClick={() => this.props.increaseSkills('strength', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('strength', this.props.playerId, player)}/>
                  <span>🗡 </span>
              </div>
              <div>
                <Icon name="add circle" color='green' onClick={() => this.props.increaseSkills('crit', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('crit', this.props.playerId, player)}/>
                  <span>⚔️ </span>
              </div>
              <div>
                <Icon name="add circle" color='green' onClick={() => this.props.increaseSkills('defense', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('defense', this.props.playerId, player)}/>
                  <span>🛡 </span> 
              </div>
              <div>
                <Icon name="add circle" color='green' onClick={() => this.props.increaseSkills('movement', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('movement', this.props.playerId, player)}/>
                  <span>🏇 </span>
              </div>
              <div>
                <Icon name="add circle" color='green' onClick={() => this.props.increaseSkills('agility', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('agility', this.props.playerId, player)}/>
                  <span>🐍  </span>
              </div>
              <div>
                <Icon name="add circle" color='green' onClick={() => this.props.increaseSkills('archery', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('archery', this.props.playerId, player)}/>
                 <span style={{marginLeft:'10px'}}> 🏹  </span>
              </div>
              <div>
                <Icon name="add circle" color='green' onClick={() => this.props.increaseSkills('revenge', this.props.playerId, player)}/>
                /<Icon name="minus circle" color='red' onClick={() => this.props.decreaseSkills('revenge', this.props.playerId, player)}/>
                  <span>👿  </span>
              </div>
                    
            </div>
          </Popup>
      )
  }
}

export default ModifyButton;