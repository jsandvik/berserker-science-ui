import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    loading: true,
    error: null,
    moves: [],
    characters: [],
    characterFilter: "",
    commandFilter: "",
  };

  componentDidMount = () => {
    fetch("https://berserkerscience.herokuapp.com/moves")
      .then(response => response.json())
      .then(
        results => {
          const characters = results.map(move => move.character);
          const uniqueCharacters = characters.filter(
            (character, index) => characters.indexOf(character) >= index
          );

          this.setState({ loading: false, moves: results, characters: uniqueCharacters });
        },
        error => {
          this.setState({ loading: false, error });
        }
      );
  }

  onFilterCharacter = (e) => {
    this.setState({characterFilter: e.target.value});
  }

  onFilterCommand = (e) => {
    this.setState({commandFilter: e.target.value});
  }

  render = () => {
    const { error, loading, moves, characters, characterFilter, commandFilter } = this.state;

    if (error) {
      return <div>Error loading: {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    let filtered_moves = moves;
    if (characterFilter) {
      filtered_moves = filtered_moves.filter(move => characterFilter === move.character);
    }
    if (commandFilter) {
      filtered_moves = filtered_moves.filter(move => commandFilter === move.command);
    }

    return (
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Filter Character</Form.Label>
              <Form.Control onChange={this.onFilterCharacter} as="select" value={characterFilter}>
                <option value="">All</option>
                {characters.map(character => (
                  <option key={character}>{character}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Filter Command</Form.Label>
              <Form.Control onChange={this.onFilterCommand} type="text" placeholder="Example: 5A" value={commandFilter} />
            </Form.Group>
          </Col>
        </Row>

        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>Character</th>
              <th>Command</th>
              <th>Hits</th>
              <th>Impact Frames</th>
              <th>Blocked Frames</th>
              <th>Hit Frames</th>
              <th>Counter Hit Frames</th>
              <th>Damage</th>
            </tr>
          </thead>
          <tbody>
            {filtered_moves.map(move => (
              <tr key={move.moveId}>
                <td>{move.character}</td>
                <td>{move.command}</td>
                <td>{move.attackTypes.join(", ")}</td>
                <td>{move.impactFrames}</td>
                <td>{move.blockFrames}</td>
                <td>{move.hitProperty ? move.hitProperty : move.hitFrames}</td>
                <td>{move.counterProperty ? move.counterProperty : move.counterFrames}</td>
                <td>{move.damage.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default App;
