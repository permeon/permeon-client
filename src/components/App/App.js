import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

import { Grid } from "semantic-ui-react";

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Home from "../../scenes/Home/Home";
import Login from "../../scenes/Login/Login";
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarVisible: true,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  }

  render() {
    const { isSidebarVisible } = this.state;
    const sidebarWidth = isSidebarVisible ? '250px' : '0';

    return (
      <div className={styles.App}>
        <Header toggleSidebar={this.toggleSidebar} />
        <Sidebar isVisible={isSidebarVisible} width={sidebarWidth} />
        <div className={styles.MainContent} style={{paddingLeft: sidebarWidth}}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}

App.propTypes = {};


// export default connect(mapStateToProps)(App)
export default App;
