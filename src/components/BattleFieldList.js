import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Label, Header, Input } from 'semantic-ui-react';
import { stringComparator } from '../utils/common';
import shortId  from 'shortid';
import * as actionCreators from '../actions/index';


// fireBase sync
import { firebaseApp } from '../firebase';
import { linkStoreWithPath } from 'firebase-redux';

// The database path you want to bind with
const battleFieldsPath = '/battlefields'

// Portion of the state that should be written to the database
const battleFieldsSelector = (state) => state.battlefields;

// Create a function to bind '/message' in the database
// with 'state.message' in the Redux store
const linkBattleFields = linkStoreWithPath(   
    battleFieldsPath, 
    actionCreators.setBattleFields, 
    battleFieldsSelector
);


class CreateBattleFieldModal extends Component {
    state = { 
        open: false,
        error: false
     }

    _close = () => {
        this.setState({
            open: false,
            error: false
        });
    }

    _open = () => {
        this.setState({
            open: true
        });
    }

    render() {
        const { open } = this.state;
        return (
            <Fragment>
                <button 
                    className="btn-two red small"
                    onClick={this._open}
                > 
                    ⚔️ Create New Battle
                </button>
                <Modal 
                    size="mini"
                    open={open}
                    onClose={this._close}
                    closeOnEscape={true}
                    closeOnRootNodeClick={true}
                >
                    <Modal.Header>New Battle Field</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                        <Header>Name:</Header>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const name = this.nameInput.value;
                                const battleField = {
                                    id: shortId.generate(),
                                    name
                                };

                                if (!name) {
                                    this.setState({
                                        error: `Can't save battle field without a name`
                                    });
                                    return
                                }
                                this.props.addBattleField(battleField);
                                this._close();
                            }}
                        >
                            <div className="ui input">
                                <input 
                                    ref={(input => this.nameInput = input)}
                                    type="text"
                                    placeholder="type name"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="btn-two green small"
                            > 
                                Save 
                            </button>
                            {this.state.error &&
                            <p className="battlefields-modal error">
                                {this.state.error}
                            </p>
                            }
                        </form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Fragment>
        )
    }
}


class BattleFieldList extends Component  {
    componentDidMount = () => {
        const { store } = this.context;
        // Invoke anywhere in the code to set up the binding
        this.unlink = linkBattleFields(firebaseApp.database(), store);

        // clear troops 
        this.props.clearTroops();
    }

    componentWillUnmount = () => {
        // Invoke unlink to remove the binding
        this.unlink();
    }
    
    render() {
        // sort array
    const battleFields = this.props.battlefields && Object.entries(this.props.battlefields).sort(stringComparator);

    return (
      <Fragment>
        <h2 className="battlefields-header">Select Battle Field or create New one</h2>
        <Table celled inverted selectable>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {battleFields && battleFields.map( ([key, value]) => {
                return (
                    <Table.Row key={key} onClick={() => this.props.history.push(`battlefield/${value.id}`)}>
                    <Table.Cell>
                        {value.name}
                    </Table.Cell>
                    </Table.Row>
                )
            })}
            </Table.Body>
        </Table>
        <CreateBattleFieldModal 
            addBattleField={this.props.addBattleField}
        />
      </Fragment>
    );
    }
}

BattleFieldList.contextTypes = {
    store: PropTypes.object
};

export default BattleFieldList;
