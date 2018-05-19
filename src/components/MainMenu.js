import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MainMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.props.setActiveMenu(name);
    this.props.history.push(name)
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
          Troops
        </Menu.Item>

        <Menu.Item
          name='battleField'
          active={active === 'battleField'}
          onClick={this.handleItemClick}
        >
          BattleField
        </Menu.Item>
      </Menu>
    )
  }
}