import React, { Component } from 'react';
import { connect } from 'react-redux';

class TroopsList extends Component {
  render() {
    return (
      <ul>
        {this.props.troops && this.props.troops.map( troop => {
          return (
            <li onClick={() => {
              this.props.history.push(`troops/${troop.name}`);
            }}>
              {troop.name}
              <ul>
                {troop.units && troop.units.map( unit =>(
                  <li>{unit.name}</li>
                ))}
              </ul>
            </li>
          )
        })
        }
      </ul>
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
null)(TroopsList);
