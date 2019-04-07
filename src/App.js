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
            <th>ID</th>
            <th>Notation</th>
            <th>Impact Frames</th>
          </tr>
        </thead>
        <tbody>
          {moves.map(move =>
            <tr key={move.moveId}>
              <td>{move.moveId}</td>
              <td>{move.notation}</td>
              <td>{move.impactFrames}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default App;
