import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {Button, Menu, SmHeader, Image, Container, Icon, Input} from "semantic-ui-react";
import styles from './Header.css';

class Header extends Component {
  render() {
    const { toggleSidebar } = this.props;

    return (
      <Menu className={styles.Header} fixed='top' borderless>
        <Menu.Item onClick={toggleSidebar}>
          <Icon name='sidebar' className={styles.OpenMenuButton} />
        </Menu.Item>
        <Menu.Item as='a' header>
          <Image
            size='mini'
            src='/logo.png'
            style={{ marginRight: '1.5em' }}
          />
          Permeon
        </Menu.Item>
        <Menu.Item style={{width: '30%'}}>
          <Input icon='search' fluid placeholder='Search...' />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button as={Link} to="/login">Log-in</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
