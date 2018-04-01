import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Menu, Image, Icon, Input, Responsive } from "semantic-ui-react";
import MediaQuery from 'react-responsive';

import { selectors } from '../../reducers';
import { steemLogout } from "../../actions/authActions";
import styles from './Header.css';
import AccountSelector from "./AccountSelector";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(steemLogout());
  }

  render() {
    const { toggleSidebar, isLoggedIn, accounts, activeAccount } = this.props;

    return (
      <Menu className={styles.Header} fixed='top' borderless>
        <Menu.Item onClick={toggleSidebar}>
          <Icon name='sidebar' className={styles.OpenMenuButton} />
        </Menu.Item>
        <Menu.Item as={Link} to='/' header>
          {/*<Image*/}
            {/*size='mini'*/}
            {/*src='/logo.png'*/}
            {/*style={{ marginRight: '1.5em' }}*/}
          {/*/>*/}
          Permeon
        </Menu.Item>

        <MediaQuery query="(min-width: 800px)">
          <Menu.Item style={{width: '30%'}}>
            <Input icon='search' fluid placeholder='Search...'  onChange={()=>alert('not implemented TODO')} />
          </Menu.Item>
        </MediaQuery>

        <Menu.Menu position='right'>
          <MediaQuery query="(max-width: 799px)">
            <Menu.Item onClick={()=>alert('not implemented TODO')} >
              <Icon name='search' />
            </Menu.Item>
          </MediaQuery>
          <Menu.Item as={Link} to='/upload' title='Upload Video'>
            <Icon name='cloud upload' />
            {/*<Button color='red'>upload</Button>*/}
          </Menu.Item>
          <Menu.Item as={Link} to='/settings' title='Settings'>
            <Icon name='setting' />
          </Menu.Item>
          <AccountSelector />
        </Menu.Menu>
      </Menu>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: selectors.auth.isLoggedIn(state),
    activeAccount: selectors.auth.activeAccountName(state),
    accounts: selectors.auth.getAccounts(state),
  };
}

export default connect(mapStateToProps)(Header);
