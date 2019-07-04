import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import MoveTable from "./MoveTable.jsx";
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

class CharacterPage extends Component {
  state = {
    loading: true,
    error: null,
    totalPages: null,
    currentPage: 1,
    moves: [],
    categories: [],
    columnSort: null,
    sortDescending: null,
    character: "",
    command: "",
    selectedMove: null,
    category: "Horizontals",
  };

  onChangeCategory = (category) => {
    this.setState(
      { category: category },
      this.fetchMoves
    );
  }

  fetchCategories = () => {
    const {
      match: {
        params: { character }
      }
    } = this.props;

    let args = {
      character
    };

    let url = `https://berserkerscience.herokuapp.com/categories/?${stringify(
      args
    )}`;
    fetch(url)
      .then(response => response.json())
      .then(
        results => {
          this.setState({
            loading: false,
            categories: results.categories
          });
        },
        error => {
          this.setState({ loading: false, error });
        }
      );
  }

  fetchMoves = () => {
    const { currentPage, command, columnSort, sortDescending, category } = this.state;

    const {
      match: {
        params: { character }
      }
    } = this.props;

    let args = {
      character
    };

    if (category) {
      args["category"] = category;
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
          });
        },
        error => {
          this.setState({ loading: false, error });
        }
      );
  };

  componentDidMount = () => {
    this.fetchCategories();
    this.fetchMoves();
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

  onCloseSubpanel = () => {
    this.setState({ selectedMove: null });
  };

  render = () => {
    const {
      error,
      loading,
      categories,
      moves,
      character,
      command,
      currentPage,
      totalPages,
      columnSort,
      sortDescending,
      selectedMove
    } = this.state;
    const { match } = this.props;

    if (error) {
      return <div>Error loading: {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Container fluid>
        <Nav variant="pills" defaultActiveKey="Horizontals" onSelect={this.onChangeCategory}>
          {categories.map(category => (
            <Nav.Item>
              <Nav.Link eventKey={category}>{category}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <MoveTable moves={moves} />
      </Container>
    );
  };
}

export default CharacterPage;
