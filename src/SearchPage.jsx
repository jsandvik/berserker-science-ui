import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Paginator from "./Paginator.jsx";
import MoveTable from "./MoveTable.jsx";
import MovePanel from "./MovePanel.jsx";
import { stringify } from "querystring";
import Drawer from "@material-ui/core/Drawer";

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

class SearchPage extends Component {
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

  handleSort = attribute => {
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

  handleSelectRow = command => {
    this.setState({ selectedMove: command });
  };

  handleCloseSubpanel = () => {
    this.setState({ selectedMove: null });
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
          <MoveTable
            moves={moves}
            columnSort={columnSort}
            sortDescending={sortDescending}
            onSelect={this.handleSelectRow}
            onSort={this.handleSort}
            selectedMove={selectedMove}
          />
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
        <Drawer
          anchor="bottom"
          open={selectedMove !== null}
          onClose={this.handleCloseSubpanel}
        >
         <MovePanel move={selectedMove} />
        </Drawer>
      </Fragment>
    );
  };
}

export default SearchPage;
