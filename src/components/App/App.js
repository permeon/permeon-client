import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Grid, Message } from "semantic-ui-react";

import LoginScene from "../../scenes/LoginScene/LoginScene";
import ChatScene from "../../scenes/ChatSceen/ChatSceen";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ChatScene} />
          <Route path="/login" component={LoginScene} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {};

// const AppContainer = connect()(App)

export default App;
