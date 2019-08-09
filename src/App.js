import React, { Fragment } from "react";
import clsx from "clsx";
import "./App.css";
import "./custom.scss";
import "typeface-roboto";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import SearchPage from "./SearchPage.jsx";
import CharacterPage from "./CharacterPage.jsx";
import Sidebar from "./Sidebar.jsx";
import { HashRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleSidebarOpen() {
    setOpen(true);
  }

  function handleSidebarClose() {
    setOpen(false);
  }

  return (
    <Router basename="/">
      <div className={classes.root}>
        <CssBaseline />
        <Navbar open={open} onSidebarOpen={handleSidebarOpen} />
        <Sidebar open={open} onSidebarClose={handleSidebarClose} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />

          <Route path="/" exact component={SearchPage} />
          <Route path="/:character" component={CharacterPage} />
        </main>
      </div>
    </Router>
  );
}
