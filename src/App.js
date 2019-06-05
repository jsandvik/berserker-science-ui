import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Paginator from "./Paginator.jsx";
import SortIcon from "./SortIcon.jsx";
import Portrait from "./Portrait.jsx";
import HitAttribute from "./HitAttribute.jsx";
import MoveProperty from "./MoveProperty.jsx";
import Frames from "./Frames.jsx";
import "./App.css";
import "./custom.scss";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import { stringify } from "querystring";

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
    columnSort: null,
    sortDescending: null,
    character: "",
    command: "",
    selectedMove: null
  };

  fetchMoves = () => {
    const {
      currentPage,
      character,
      command,
      columnSort,
      sortDescending
    } = this.state;

    let args = {
      size: SIZE,
      page: currentPage - 1
    };

    if (character) {
      args["character"] = character;
    }

    if (command) {
      args["command"] = command;
    }

    if (columnSort) {
      const orderBy = [];
      // special case, for hit/counter sort by properties first cause they are bigger rewards
      if (columnSort === "hit_frames") {
        const desc = sortDescending ? "" : "-";
        orderBy.push(`${desc}hit_property`);
      } else if (columnSort === "counter_frames") {
        const desc = sortDescending ? "" : "-";
        orderBy.push(`${desc}counter_property`);
      }

      const desc = sortDescending ? "" : "-";
      orderBy.push(`${desc}${columnSort}`);

      args["order_by"] = orderBy;
    }

    let url = `https://berserkerscience.herokuapp.com/moves/?${stringify(
      args
    )}`;
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
    this.fetchMoves();
  };

  onFilterCharacter = e => {
    const character = e.target.value;
    this.setState(
      { character, currentPage: 1, columnSort: null, sortDescending: null },
      this.fetchMoves
    );
  };

  onFilterCommand = e => {
    const command = e.target.value;
    this.setState(
      { command, currentPage: 1, columnSort: null, sortDescending: null },
      this.fetchMoves
    );
  };

  onPageChange = page => {
    this.setState({ currentPage: page }, this.fetchMoves);
  };

  onSort = attribute => {
    const { columnSort, sortDescending } = this.state;

    // default, descending == false. if selected before toggle descending
    let descending = false;
    if (attribute === columnSort) {
      descending = !sortDescending;
    }
    this.setState(
      { columnSort: attribute, sortDescending: descending, currentPage: 1 },
      this.fetchMoves
    );
  };

  onSelectRow = command => {
    this.setState({ selectedMove: command });
  };

  render = () => {
    const {
      error,
      loading,
      moves,
      character,
      command,
      currentPage,
      totalPages,
      columnSort,
      sortDescending,
      selectedMove
    } = this.state;

    if (error) {
      return <div>Error loading: {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Fragment>
        <Container fluid>
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
                  value={command}
                />
              </Form.Group>
            </Col>
          </Row>

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
                    {move.combos.filter(combo => combo.condition === "NC").length !== 0 &&
                      <Badge className="mr-1" variant="primary">{move.combos.filter(combo => combo.condition === "NC").length} NC</Badge>
                    }
                    {move.combos.filter(combo => combo.condition === "NCC").length !== 0 &&
                    <Badge className="mr-1" variant="danger">{move.combos.filter(combo => combo.condition === "NCC").length} NCC</Badge>
                    }
                    {move.combos.filter(combo => combo.condition === "LH").length !== 0 &&
                    <Badge variant="warning">{move.combos.filter(combo => combo.condition === "LH").length} LH</Badge>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <div className="text-xs-center">
              <Paginator
                hidePreviousAndNextPageLinks
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={this.onPageChange}
              />
            </div>
          )}
        </Container>
        {selectedMove != null && (
          <div className="app-sub-panel">
            <Card>
              <Card.Header style={{ padding: "0.3em" }}>
                {selectedMove.character} - {selectedMove.command}
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
                      <th>
                        Impact{" "}
                      </th>
                      <th>
                        Block{" "}
                      </th>
                      <th>
                        Hit{" "}
                      </th>
                      <th>
                        Counter{" "}
                      </th>
                      <th>Damage</th>
                      <th>Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                        <td>
                          {selectedMove.attackTypes.map(attribute => (
                            <HitAttribute attribute={attribute} />
                          ))}
                        </td>
                        <td>
                          {selectedMove.moveProperties.map(property => (
                            <MoveProperty property={property} />
                          ))}
                        </td>
                        <td>{selectedMove.impactFrames}</td>
                        <Frames frames={selectedMove.blockFrames} />
                        <Frames
                          frames={selectedMove.hitFrames}
                          property={selectedMove.hitProperty}
                        />
                        <Frames
                          frames={selectedMove.counterFrames}
                          property={selectedMove.counterProperty}
                        />
                        <td>{selectedMove.damage.join(", ")}</td>
                        <td>{selectedMove.gapFrames.join(", ")}</td>
                      </tr>
                  </tbody>
                </Table>
              </Card.Body>

              <Table
                striped
                bordered
                size="sm"
                responsive
                className="app-table"
              >
                <thead>
                  <tr>
                    <th>Combos</th>
                    <th>Damage</th>
                    <th>Condition</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMove.combos.map(combo => (
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
        )}
      </Fragment>
    );
  };
}

export default App;
