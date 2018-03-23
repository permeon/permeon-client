import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Grid, Message } from "semantic-ui-react";

import Login from "../../scenes/Login/Login";
import Home from "../../scenes/Home/Home";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {};

// const AppContainer = connect()(App)

export default App;
