import React, { Component } from "react";
import "./App.css";
import "./custom.scss";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import SearchPage from "./SearchPage.jsx";
import CharacterPage from "./CharacterPage.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  render = () => {
    return (
      <Router>
        <Route path="/soulcalibur/" exact component={SearchPage} />
        <Route path="/soulcalibur/:character" component={CharacterPage} />
      </Router>
    );
  };
}

export default App;
