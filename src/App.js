import React, { Component } from "react";
import "./App.css";
import "./custom.scss";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import SearchPage from "./SearchPage.jsx";
import CharacterPage from "./CharacterPage.jsx";
import { HashRouter as Router, Route } from "react-router-dom";

class App extends Component {

  render = () => {
    return (
      <Router basename="/soulcalibur">
        <Route path="/" exact component={SearchPage} />
        <Route path="/:character" component={CharacterPage} />
      </Router>
    );
  };
}

export default App;
