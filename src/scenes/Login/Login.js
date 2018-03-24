import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Header, Grid } from "semantic-ui-react";

import styles from "./Login.css";
import LoginForm from "./LoginForm";

const REDIRECT_URL = "/";

class Login extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.history.push(REDIRECT_URL);
    }
  }

  handleRedirect() {
    this.props.history.push(REDIRECT_URL);
  }

  render() {
    return (
      <Grid centered verticalAlign="middle" className={styles.LoginScene}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>Login with Your Steem Account</Header>
          <LoginForm dispatch={this.props.dispatch} redirect={this.handleRedirect.bind(this)} />
        </Grid.Column>
      </Grid>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Login);
