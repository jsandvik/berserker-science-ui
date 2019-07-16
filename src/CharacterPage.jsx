import React, { Component, Fragment } from "react";
import MoveTable from "./MoveTable.jsx";
import MovePanel from "./MovePanel.jsx";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Drawer from "@material-ui/core/Drawer";
import { stringify } from "querystring";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
    categoryIndex: 0
  };

  onChangeCategory = (event, categoryIndex) => {
    this.setState({ categoryIndex: categoryIndex }, this.fetchMoves);
  };

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
  };

  fetchMoves = () => {
    const {
      currentPage,
      command,
      columnSort,
      sortDescending,
      categoryIndex,
      categories
    } = this.state;

    const {
      match: {
        params: { character }
      }
    } = this.props;

    let args = {
      character
    };

    const category = categories[categoryIndex];
    if (category) {
      args["category"] = category;
    } else {
      args["category"] = "Horizontals";
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
            moves: results.moves
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

  handleMoveSelect = command => {
    this.setState({ selectedMove: command });
  };

  handleCloseSubpanel = () => {
    this.setState({ selectedMove: null });
  };

  render = () => {
    const {
      match: {
        params: { character }
      }
    } = this.props;

    const {
      error,
      loading,
      categories,
      categoryIndex,
      moves,
      sortDescending,
      columnSort,
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
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Berserker Science</Typography>
          </Toolbar>
        </AppBar>
        <AppBar position="static">
          <Tabs
            value={categoryIndex}
            onChange={this.onChangeCategory}
            variant="scrollable"
          >
            {categories.map(category => (
              <Tab label={category} />
            ))}
          </Tabs>
        </AppBar>
        <MoveTable
          moves={moves}
          columnSort={columnSort}
          sortDescending={sortDescending}
          hiddenColumns={["character"]}
          onSort={this.handleSort}
          onSelect={this.handleMoveSelect}
          selectedMove={selectedMove}
        />
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

export default CharacterPage;
