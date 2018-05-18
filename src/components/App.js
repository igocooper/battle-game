import React, { Component, Fragment } from 'react';
import Header from './Header';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    header: 'header'
  };

  render() {
    console.log(this.props.troops);
    return (
      <Fragment>
        <div>
          Hello. I'm App.
        </div>
        <Header message={this.state.header}/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        troops: state
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onTodoClick: (id) => {
//             dispatch( toggleTodoAction(id));

//         }
//     }
// };

export default connect(
  mapStateToProps,
  null)(App);

