import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon.jsx";
import Badge from "react-bootstrap/Badge";
import Portrait from "./Portrait.jsx";
import HitAttribute from "./HitAttribute.jsx";
import MoveProperty from "./MoveProperty.jsx";
import Frames from "./Frames.jsx";

export default class MoveTable extends Component {
  render = () => {
    const {moves, columnSort, sortDescending} = this.props;

    return (
      <Table striped bordered hover size="sm" responsive className="app-table">
        <thead>
          <tr>
            <th>Character</th>
            <th>Command</th>
            <th>Hits</th>
            <th>Properties</th>
            <th
              className="sortable-table-header"
              onClick={() => this.onSort("impact_frames")}
            >
              Impact{" "}
              <SortIcon
                active={columnSort === "impact_frames"}
                descending={sortDescending}
              />
            </th>
            <th
              className="sortable-table-header"
              onClick={() => this.onSort("block_frames")}
            >
              Block{" "}
              <SortIcon
                active={columnSort === "block_frames"}
                descending={sortDescending}
              />
            </th>
            <th
              className="sortable-table-header"
              onClick={() => this.onSort("hit_frames")}
            >
              Hit{" "}
              <SortIcon
                active={columnSort === "hit_frames"}
                descending={sortDescending}
              />
            </th>
            <th
              className="sortable-table-header"
              onClick={() => this.onSort("counter_frames")}
            >
              Counter{" "}
              <SortIcon
                active={columnSort === "counter_frames"}
                descending={sortDescending}
              />
            </th>
            <th>Damage</th>
            <th>Gap</th>
            <th>Combos</th>
          </tr>
        </thead>
        <tbody>
          {moves.map(move => (
            <tr key={move.moveId} onClick={() => this.onSelectRow(move)}>
              <td>
                <Portrait character={move.character} />
              </td>
              <td>{move.command}</td>
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
              <Frames frames={move.hitFrames} property={move.hitProperty} />
              <Frames
                frames={move.counterFrames}
                property={move.counterProperty}
              />
              <td>{move.damage.join(", ")}</td>
              <td>{move.gapFrames.join(", ")}</td>
              <td>
                {move.combos.filter(combo => combo.condition === "NC")
                  .length !== 0 && (
                  <Badge className="mr-1" variant="primary">
                    {
                      move.combos.filter(combo => combo.condition === "NC")
                        .length
                    }{" "}
                    NC
                  </Badge>
                )}
                {move.combos.filter(combo => combo.condition === "NCC")
                  .length !== 0 && (
                  <Badge className="mr-1" variant="danger">
                    {
                      move.combos.filter(combo => combo.condition === "NCC")
                        .length
                    }{" "}
                    NCC
                  </Badge>
                )}
                {move.combos.filter(combo => combo.condition === "LH")
                  .length !== 0 && (
                  <Badge variant="warning">
                    {
                      move.combos.filter(combo => combo.condition === "LH")
                        .length
                    }{" "}
                    LH
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
}
