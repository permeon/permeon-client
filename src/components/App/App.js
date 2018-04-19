import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Home from '../../scenes/Home/Home';
import Login from '../../scenes/Login/Login';
import Upload from '../../scenes/Upload/Upload';
import Channel from '../../scenes/Channel/Channel';
import Video from '../../scenes/Video/Video';
import HotVideos from '../../scenes/HotVideos/HotVideos';
import NewVideos from '../../scenes/NewVideos/NewVideos'
import TrendingVideos from '../../scenes/TrendingVideos/TrendingVideos'
import SubscriptionVideos from '../../scenes/SubscriptionVideos/SubscriptionVideos'

import styles from './App.css';
import Settings from '../../scenes/Settings/Settings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarVisible: false
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible
    }));
  }

  render() {
    const { isSidebarVisible } = this.state;
    const sidebarWidth = isSidebarVisible ? 250 : 0;

    return (
      <div className={styles.App}>
        <Header toggleSidebar={this.toggleSidebar} />
        <Sidebar isVisible={isSidebarVisible} width={sidebarWidth} />
        <div className={styles.MainContent} style={{ paddingLeft: sidebarWidth }}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/upload" component={Upload} />
          <Route path="/settings" component={Settings} />
          <Route path="/hot" component={HotVideos} />
          <Route path="/new" component={NewVideos} />
          <Route path="/trending" component={TrendingVideos} />
          <Route path="/feed" component={SubscriptionVideos} />
          <Route exact path="/channel/:username" component={Channel} />
          <Route exact path="/v/:tag/:channel/:permlink" component={Video} />
          <Route exact path="/dist/" render={() => (
            <Redirect to="/" />
          )}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {};

// export default connect(mapStateToProps)(App)
export default App;
