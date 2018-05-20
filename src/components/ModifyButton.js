import React, {Component} from 'react'
import { Popup, Button , Label, Icon } from 'semantic-ui-react'

class ModifyButton extends Component {
  state = { 
      strength: 0,
      dodge: 0,
      defense: 0,
      crit: 0,
      agility: 0,
      archery: 0,
      movement: 0,
      revenge: 0
    }

  handleChange = (e)  => {
    const heal = parseInt( e.target.value, 10);
    this.setState({ healing: heal })
  }

  render() {
    const { healing } = this.state;
      return (
          <Popup
              trigger={
                <a href="#" 
                    className="btn-two cyan mini" 
                    onClick={ () => {
                    console.log('nothing has been done');
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
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                  <span>🗡 </span>
              </div>
              <div>
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                  <span>⚔️ </span>
              </div>
              <div>
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                  <span>🛡 </span> 
              </div>
              <div>
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                  <span>🏇 </span>
              </div>
              <div>
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                  <span>🐍  </span>
              </div>
              <div>
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                 <span style={{marginLeft:'10px'}}> 🏹  </span>
              </div>
              <div>
                <Icon name="add circle" color='green' style={{cursor: 'pointer'}}/>/<Icon name="minus circle" color='red' style={{cursor: 'pointer'}}/>
                  <span>👿  </span>
              </div>
                    
            </div>
          </Popup>
      )
  }
}

export default ModifyButton;