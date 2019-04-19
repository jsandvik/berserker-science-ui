import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Paginator from "./Paginator.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const SIZE = 100;
const CHARACTERS = [
  "2B",
  "Amy",
  "Astaroth",
  "Azwel",
  "Cervantes",
  "Geralt",
  "Groh",
  "Ivy",
  "Kilik",
  "Maxi",
  "Mitsurugi",
  "Nightmare",
  "Raphael",
  "Seung Mi-na",
  "Siegfried",
  "Sophitia",
  "Taki",
  "Talim",
  "Tira",
  "Voldo",
  "Xianghua",
  "Yoshimitsu",
  "Zasalamel"
];

class App extends Component {
  state = {
    loading: true,
    error: null,
    totalPages: null,
    currentPage: 1,
    moves: [],
    character: "",
    commandFilter: ""
  };

  fetchMoves = (page, character) => {
    let url = `https://berserkerscience.herokuapp.com/moves/?size=${SIZE}&page=${page}`;

    if (character) {
      url += `&character=${character}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(
        results => {
          this.setState({
            loading: false,
            moves: results.moves,
            totalPages: results.numPages
          });
        },
        error => {
          this.setState({ loading: false, error });
        }
      );
  };

  componentDidMount = () => {
    this.fetchMoves(0);
  };

  onFilterCharacter = e => {
    const character = e.target.value;
    this.setState({ character, currentPage: 1 });
    this.fetchMoves(0, character);
  };

  onFilterCommand = e => {
    this.setState({ commandFilter: e.target.value });
  };

  onPageChange = page => {
    const { character } = this.state;
    this.setState({ currentPage: page });
    this.fetchMoves(page - 1, character);
  };

  render = () => {
    const {
      error,
      loading,
      moves,
      character,
      commandFilter,
      currentPage,
      totalPages
    } = this.state;

    if (error) {
      return <div>Error loading: {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    let filtered_moves = moves;
    if (commandFilter) {
      filtered_moves = filtered_moves.filter(
        move => commandFilter === move.command
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Filter Character</Form.Label>
              <Form.Control
                onChange={this.onFilterCharacter}
                as="select"
                value={character}
              >
                <option value="">All</option>
                {CHARACTERS.map(character => (
                  <option key={character}>{character}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Filter Command</Form.Label>
              <Form.Control
                onChange={this.onFilterCommand}
                type="text"
                placeholder="Example: 5A"
                value={commandFilter}
              />
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
              <th>Gap Frames</th>
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
                <td>
                  {move.counterProperty
                    ? move.counterProperty
                    : move.counterFrames}
                </td>
                <td>{move.damage.join(", ")}</td>
                <td>{move.gapFrames.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-xs-center">
          <Paginator
            hidePreviousAndNextPageLinks
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={this.onPageChange}
          />
        </div>
      </Container>
    );
  };
}

export default App;
