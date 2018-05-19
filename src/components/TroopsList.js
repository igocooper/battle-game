import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';


const TroopsList = (props) => {
    return (
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Units</Table.HeaderCell>
            <Table.HeaderCell>Total Health</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.troops && Object.entries(props.troops).map( ([key, value]) => {
            const totalHealth = value.units.reduce( (total, unit) => total += unit.health, 0);
            const units = value.units.length;
              return (
                <Table.Row key={key} onClick={() => props.history.push(`troops/${key}`)}>
                  <Table.Cell>
                    {value.name}
                  </Table.Cell>
                  <Table.Cell>
                    {units}
                  </Table.Cell>
                  <Table.Cell>
                    {totalHealth}
                  </Table.Cell>
                </Table.Row>
              )
          })}
        </Table.Body>
    </Table>
    );
}

export default TroopsList;
