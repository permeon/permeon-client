import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon } from "semantic-ui-react";
import styles from './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(event, {name}) {}

  render() {
    const { width, location } = this.props;
    const activeItem = 'home';
    const path = location.pathname;

    return (
      <Menu
        className={styles.Sidebar}
        vertical
        fixed='left'
        style={{width}}
      >
        <Menu.Item name='home' active={path === '/'} onClick={this.handleItemClick} as={Link} to="/">
          Home
          <Icon name="home"/>
        </Menu.Item>
        <Menu.Item name='channel' active={path === '/channel'} onClick={this.handleItemClick} as={Link} to="/channel">
          My Channel
          <Icon name="grid layout"/>
        </Menu.Item>
      </Menu>
    );
  }
}

Sidebar.propTypes = {};

export default withRouter(Sidebar);
