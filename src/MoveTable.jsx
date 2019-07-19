import React, { Component } from "react";
import PropTypes from "prop-types";
import Badge from "react-bootstrap/Badge";
import Portrait from "./Portrait.jsx";
import HitAttribute from "./HitAttribute.jsx";
import MoveProperty from "./MoveProperty.jsx";
import Frames from "./Frames.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export default class MoveTable extends Component {
  static propTypes = {
    moves: PropTypes.arrayOf(PropTypes.object).isRequired,
    hiddenColumns: PropTypes.arrayOf(PropTypes.object),
    onSort: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedMove: PropTypes.object
  };

  static defaultProps = {
    hiddenColumns: [],
    selectedMove: null
  };

  getVisibilityClass = columnName => {
    const { hiddenColumns } = this.props;

    return hiddenColumns.includes(columnName) ? "d-none" : null;
  };

  render = () => {
    const {
      moves,
      columnSort,
      order,
      onSelect,
      onSort,
      selectedMove
    } = this.props;

    return (
      <div style={{ overflowX: "auto" }}>
        <Table size="small" className={"app-table"}>
          <TableHead>
            <TableRow>
              <TableCell className={this.getVisibilityClass("character")}>
                Character
              </TableCell>
              <TableCell className={this.getVisibilityClass("command")}>
                Command
              </TableCell>
              <TableCell className={this.getVisibilityClass("hits")}>
                Hits
              </TableCell>
              <TableCell className={this.getVisibilityClass("properties")}>
                Properties
              </TableCell>
              <TableCell
                className={`${this.getVisibilityClass(
                  "impact_frames"
                )} sortable-table-header`}
                sortDirection={columnSort === "impact_frames" ? order : false}
              >
                <TableSortLabel
                  active={columnSort === "impact_frames"}
                  direction={order}
                  onClick={() => onSort("impact_frames")}
                >
                  Impact
                </TableSortLabel>
              </TableCell>
              <TableCell
                className={`${this.getVisibilityClass(
                  "block_frames"
                )} sortable-table-header`}
                sortDirection={columnSort === "block_frames" ? order : false}
              >
                <TableSortLabel
                  active={columnSort === "block_frames"}
                  direction={order}
                  onClick={() => onSort("block_frames")}
                >
                  Block
                </TableSortLabel>
              </TableCell>
              <TableCell
                className={`${this.getVisibilityClass(
                  "hit_frames"
                )} sortable-table-header`}
                sortDirection={columnSort === "hit_frames" ? order : false}
              >
                <TableSortLabel
                  active={columnSort === "hit_frames"}
                  direction={order}
                  onClick={() => onSort("hit_frames")}
                >
                  Hit
                </TableSortLabel>
              </TableCell>
              <TableCell
                className={`${this.getVisibilityClass(
                  "counter_frames"
                )} sortable-table-header`}
                sortDirection={columnSort === "counter_frames" ? order : false}
              >
                <TableSortLabel
                  active={columnSort === "counter_frames"}
                  direction={order}
                  onClick={() => onSort("counter_frames")}
                >
                  Counter
                </TableSortLabel>
              </TableCell>
              <TableCell className={this.getVisibilityClass("damage")}>
                Damage
              </TableCell>
              <TableCell className={this.getVisibilityClass("combos")}>
                Combos
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moves.map(move => (
              <TableRow
                key={move.moveId}
                onClick={() => onSelect(move)}
                selected={selectedMove === move}
              >
                <TableCell className={this.getVisibilityClass("character")}>
                  <Portrait character={move.character} />
                </TableCell>
                <TableCell className={this.getVisibilityClass("command")}>
                  {move.command}
                </TableCell>
                <TableCell className={this.getVisibilityClass("hits")}>
                  {move.attackTypes.map(attribute => (
                    <HitAttribute attribute={attribute} />
                  ))}
                </TableCell>
                <TableCell className={this.getVisibilityClass("properties")}>
                  {move.moveProperties.map(property => (
                    <MoveProperty property={property} />
                  ))}
                </TableCell>
                <TableCell className={this.getVisibilityClass("impact_frames")}>
                  {move.impactFrames}
                </TableCell>
                <Frames
                  frames={move.blockFrames}
                  className={this.getVisibilityClass("block_frames")}
                />
                <Frames
                  frames={move.hitFrames}
                  property={move.hitProperty}
                  className={this.getVisibilityClass("hit_frames")}
                />
                <Frames
                  frames={move.counterFrames}
                  property={move.counterProperty}
                  className={this.getVisibilityClass("counter_frames")}
                />
                <TableCell className={this.getVisibilityClass("damage")}>
                  {move.damage.join(", ")}
                </TableCell>
                <TableCell className={this.getVisibilityClass("combos")}>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
}
