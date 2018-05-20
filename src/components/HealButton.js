import React, {Component} from 'react'
import { Popup } from 'semantic-ui-react'

class HealButton extends Component {
  state = { healing: 10 }

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
                  className="btn-two yellow mini" 
                  onClick={() => this.props.heal(this.state.healing, this.props.playerId)}
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

export default HealButton;