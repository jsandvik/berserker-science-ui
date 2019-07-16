import React, { Component, Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import HitAttribute from "./HitAttribute.jsx";
import MoveProperty from "./MoveProperty.jsx";
import Frames from "./Frames.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

export default class MovePanel extends Component {
  render = () => {
    const { move } = this.props;
    if (move === null) return null;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell variant="head">Command</TableCell>
                <TableCell>{move.command}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Hits</TableCell>
                <TableCell>
                  {move.attackTypes.map(attribute => (
                    <HitAttribute attribute={attribute} />
                  ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Properties</TableCell>
                <TableCell>
                  {move.moveProperties.map(property => (
                    <MoveProperty property={property} />
                  ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Impact </TableCell>
                <TableCell>{move.impactFrames}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Block </TableCell>
                <Frames frames={move.blockFrames} />
              </TableRow>
              <TableRow>
                <TableCell variant="head">Hit </TableCell>
                <Frames frames={move.hitFrames} property={move.hitProperty} />
              </TableRow>
              <TableRow>
                <TableCell variant="head">Counter </TableCell>
                <Frames
                  frames={move.counterFrames}
                  property={move.counterProperty}
                />
              </TableRow>
              <TableRow>
                <TableCell variant="head">Damage</TableCell>
                <TableCell>{move.damage.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow />
            </TableBody>
          </Table>
        </Grid>
        {move.combos.length != 0 &&
        <Grid item xs={12} sm={9}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Combos</TableCell>
                <TableCell>Damage</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {move.combos.map(combo => (
                <TableRow>
                  <TableCell>{combo.commands}</TableCell>
                  <TableCell>{combo.damage}</TableCell>
                  <TableCell>
                    <Chip size="small" label={combo.condition} />
                  </TableCell>
                  <TableCell>{combo.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>}
      </Grid>
    );
  };
}
