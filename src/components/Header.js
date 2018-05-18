import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header >
        {this.props.message || `Hello. I'm Header`}
      </header>
    );
  }
}

export default Header;
