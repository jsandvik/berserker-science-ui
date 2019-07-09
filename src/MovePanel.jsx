import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import HitAttribute from "./HitAttribute.jsx";
import MoveProperty from "./MoveProperty.jsx";
import Frames from "./Frames.jsx";

export default class MovePanel extends Component {
  render = () => {

    const {move, onClose} = this.props;

    return (
      <div className="app-sub-panel">
        <Card>
          <Card.Header style={{ padding: "0.5em" }}>
            {move.character} - {move.command}
            <span
              className="float-right"
              title="sort descending"
              aria-hidden="true"
            >
              <Button variant="danger" size="sm" onClick={onClose}>
                <span className="oi oi-x" />
              </Button>
            </span>
          </Card.Header>
          <Card.Body>
            <Table
              striped
              bordered
              hover
              size="sm"
              responsive
              className="app-table"
            >
              <thead>
                <tr>
                  <th>Hits</th>
                  <th>Properties</th>
                  <th>Impact </th>
                  <th>Block </th>
                  <th>Hit </th>
                  <th>Counter </th>
                  <th>Damage</th>
                  <th>Gap</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {move.attackTypes.map(attribute => (
                      <HitAttribute attribute={attribute} />
                    ))}
                  </td>
                  <td>
                    {move.moveProperties.map(property => (
                      <MoveProperty property={property} />
                    ))}
                  </td>
                  <td>{move.impactFrames}</td>
                  <Frames frames={move.blockFrames} />
                  <Frames
                    frames={move.hitFrames}
                    property={move.hitProperty}
                  />
                  <Frames
                    frames={move.counterFrames}
                    property={move.counterProperty}
                  />
                  <td>{move.damage.join(", ")}</td>
                  <td>{move.gapFrames.join(", ")}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>

          <Table striped bordered size="sm" responsive className="app-table">
            <thead>
              <tr>
                <th>Combos</th>
                <th>Damage</th>
                <th>Condition</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {move.combos.map(combo => (
                <tr>
                  <td>{combo.commands}</td>
                  <td>{combo.damage}</td>
                  <td>{combo.condition}</td>
                  <td>{combo.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  };
}
