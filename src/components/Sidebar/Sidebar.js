import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon, Divider } from "semantic-ui-react";
import styles from './Sidebar.css';
import {selectors} from "../../reducers";
import {allSubscriptions} from "../../actions/subscriptionsActions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, subscriptions } = this.props;
    if (!subscriptions.length) {
      dispatch(allSubscriptions());
    }
  }

  handleItemClick(event, {name}) {}

  render() {
    const { width, location, activeAccount, subscriptions } = this.props;
    const path = location.pathname;

    return (
      <Menu
        className={styles.Sidebar}
        vertical
        fixed='left'
        style={{width}}
      >
        <Menu.Item name='home' active={path === '/'} onClick={this.handleItemClick} as={Link} to="/" className={styles.Item}>
          Home
          <Icon name="home"/>
        </Menu.Item>
        <Menu.Item name='channel' active={path === '/channel'} onClick={this.handleItemClick} as={Link} to={`/channel/${activeAccount}`} className={styles.Item}>
          My Channel
          <Icon name="grid layout"/>
        </Menu.Item>
        <Menu.Item name='upload' active={path === '/upload'} onClick={this.handleItemClick} as={Link} to='/upload' className={styles.Item}>
          Upload
          <Icon name="cloud upload"/>
        </Menu.Item>
        <Menu.Item name='trending' active={path === '/trending'} onClick={this.handleItemClick} as={Link} to='/trending' className={styles.Item}>
          Trending
          <Icon name="trophy"/>
        </Menu.Item>
        <Menu.Item name='hot' active={path === '/hot'} onClick={this.handleItemClick} as={Link} to='/hot' className={styles.Item}>
          Hot
          <Icon name="fire"/>
        </Menu.Item>
        <Menu.Item name='new' active={path === '/new'} onClick={this.handleItemClick} as={Link} to='/new' className={styles.Item}>
          New
          <Icon name="hourglass outline"/>
        </Menu.Item>

        <Divider />

        <Menu.Item name='subscriptions' className={styles.Item}>
          <Menu.Header>Subscriptions</Menu.Header>
          <Menu.Menu>
            {subscriptions.map(sub => (
              <Menu.Item name={sub} as={Link} to={`/channel/${sub}`} className={styles.Item} />
            ))}
          </Menu.Menu>
        </Menu.Item>

        <Divider />

        <Menu.Item name='settings' active={path === '/settings'} onClick={this.handleItemClick} as={Link} to="/settings" className={styles.Item}>
          Settings
          <Icon name="setting"/>
        </Menu.Item>
      </Menu>
    );
  }
}

Sidebar.propTypes = {};

function mapStateToProps(state) {
  const activeAccount = selectors.auth.activeAccountName(state);
  return {
    activeAccount,
    subscriptions: selectors.subscriptions.mySubscriptions(state, activeAccount) || [],
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar));
