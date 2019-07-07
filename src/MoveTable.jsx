import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon.jsx";
import Badge from "react-bootstrap/Badge";
import Portrait from "./Portrait.jsx";
import HitAttribute from "./HitAttribute.jsx";
import MoveProperty from "./MoveProperty.jsx";
import Frames from "./Frames.jsx";

export default class MoveTable extends Component {
  static propTypes = {
    moves: PropTypes.arrayOf(PropTypes.object).isRequired,
    hiddenColumns: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    hiddenColumns: []
  };

  getVisibilityClass = columnName => {
    const { hiddenColumns } = this.props;

    return hiddenColumns.includes(columnName) ? "d-none" : null;
  };

  render = () => {
    const { moves, columnSort, sortDescending, onSelect } = this.props;

    return (
      <Table striped bordered hover size="sm" responsive className="app-table">
        <thead>
          <tr>
            <th className={this.getVisibilityClass("character")}>Character</th>
            <th className={this.getVisibilityClass("command")}>Command</th>
            <th className={this.getVisibilityClass("hits")}>Hits</th>
            <th className={this.getVisibilityClass("properties")}>
              Properties
            </th>
            <th
              className={`${this.getVisibilityClass(
                "impact_frames"
              )} sortable-table-header`}
              onClick={() => this.onSort("impact_frames")}
            >
              Impact{" "}
              <SortIcon
                active={columnSort === "impact_frames"}
                descending={sortDescending}
              />
            </th>
            <th
              className={`${this.getVisibilityClass(
                "block_frames"
              )} sortable-table-header`}
              onClick={() => this.onSort("block_frames")}
            >
              Block{" "}
              <SortIcon
                active={columnSort === "block_frames"}
                descending={sortDescending}
              />
            </th>
            <th
              className={`${this.getVisibilityClass(
                "hit_frames"
              )} sortable-table-header`}
              onClick={() => this.onSort("hit_frames")}
            >
              Hit{" "}
              <SortIcon
                active={columnSort === "hit_frames"}
                descending={sortDescending}
              />
            </th>
            <th
              className={`${this.getVisibilityClass(
                "counter_frames"
              )} sortable-table-header`}
              onClick={() => this.onSort("counter_frames")}
            >
              Counter{" "}
              <SortIcon
                active={columnSort === "counter_frames"}
                descending={sortDescending}
              />
            </th>
            <th className={this.getVisibilityClass("damage")}>Damage</th>
            <th className={this.getVisibilityClass("combos")}>Combos</th>
          </tr>
        </thead>
        <tbody>
          {moves.map(move => (
            <tr key={move.moveId} onClick={() => onSelect(move)}>
              <td className={this.getVisibilityClass("character")}>
                <Portrait character={move.character} />
              </td>
              <td className={this.getVisibilityClass("command")}>
                {move.command}
              </td>
              <td className={this.getVisibilityClass("hits")}>
                {move.attackTypes.map(attribute => (
                  <HitAttribute attribute={attribute} />
                ))}
              </td>
              <td className={this.getVisibilityClass("properties")}>
                {move.moveProperties.map(property => (
                  <MoveProperty property={property} />
                ))}
              </td>
              <td className={this.getVisibilityClass("impact_frames")}>
                {move.impactFrames}
              </td>
              <Frames frames={move.blockFrames} className={this.getVisibilityClass("block_frames")} />
              <Frames frames={move.hitFrames} property={move.hitProperty}  className={this.getVisibilityClass("hit_frames")}/>
              <Frames
                frames={move.counterFrames}
                property={move.counterProperty}
                className={this.getVisibilityClass("counter_frames")}
              />
              <td className={this.getVisibilityClass("damage")}>
                {move.damage.join(", ")}
              </td>
              <td className={this.getVisibilityClass("combos")}>
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
