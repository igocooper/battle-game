import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'



export default class MainMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.props.setActiveMenu(name);
  }

  render() {
    const { active } = this.props.menu

    return (
      <Menu stackable inverted  >
        <Menu.Item>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} />
        </Menu.Item>

        <Menu.Item
          name='troops'
          active={active === 'troops'}
          onClick={this.handleItemClick}
        >
          <Link to="/troops">Troops</Link>
        </Menu.Item>

        <Menu.Item
          name='battleField'
          active={active === 'battleField'}
          onClick={this.handleItemClick}
        >
          <Link to="/battlefield">BattleField</Link>
        </Menu.Item>
      </Menu>
    )
  }
}