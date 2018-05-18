import React, { Component } from 'react';
import { connect } from 'react-redux';

class TroopsList extends Component {
  render() {
    return (
      <ul>
        {this.props.troops && Object.entries(this.props.troops).map( ([key, value]) => {
          return (
            <li key={key} onClick={() => {
              this.props.history.push(`troops/${key}`);
            }}>
              {value.name}
              {/* <ul>
                {value.units && value.units.map( (unit, index) =>(
                  <li key={index}>{unit.name}</li>
                ))}
              </ul> */}
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
