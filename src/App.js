import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    loading: true,
    error: null,
    moves: []
  };

  componentDidMount() {
    fetch("https://berserkerscience.herokuapp.com/moves")
      .then(response => response.json())
      .then(
        results => {
          this.setState({ loading: false, moves: results });
        },
        error => {
          this.setState({ loading: false, error });
        }
      );
  }

  render() {
    const { error, loading, moves } = this.state;

    if (error) {
      return <div>Error loading: {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Character</th>
            <th>Command</th>
            <th>Impact Frames</th>
            <th>Blocked Frames</th>
            <th>Hit Frames</th>
            <th>Counter Hit Frames</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {moves.map(move =>
            <tr key={move.moveId}>
              <td>{move.character.characterName}</td>
              <td>{move.command}</td>
              <td>{move.impactFrames}</td>
              <td>{move.blockFrames}</td>
              <td>{move.hitFrames}</td>
              <td>{move.counterFrames}</td>
              <td>{move.damage}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default App;
