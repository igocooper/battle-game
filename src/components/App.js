import React, { Component, Fragment } from 'react';

class App extends Component {
  state = {
    header: 'header'
  };

  render() {
    return (
      <Fragment>
        <div>
          Hello. I'm App.
        </div>
      </Fragment>
    );
  }
}

export default App

