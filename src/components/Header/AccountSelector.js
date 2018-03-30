import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from "semantic-ui-react";

import Avatar from "../Avatar/Avatar";
import { setActiveAccount } from '../../actions/authActions';
import {selectors} from "../../reducers";
import styles from './AccountSelector.css';

const AccountSelector = ({
  isLoggedIn,
  activeAccount,
  accounts,
  onAccountClick,
}) => {
  return (
    isLoggedIn ? (
      <Dropdown item trigger={<div><Avatar username={activeAccount}/>{activeAccount}</div>}>
        <Dropdown.Menu>
          {accountItems(accounts, activeAccount, onAccountClick)}
          <Dropdown.Divider style={{margin: 0}}/>
          <Dropdown.Item as={Link} to='/login'>Add account</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Menu.Item>
        <Button as={Link} to="/login">Log-in</Button>
      </Menu.Item>
    )
  );
};

function accountItems(accounts, activeAccount, onAccountClick) {
  return (
    accounts.map(account => {
      const classes = account.username === activeAccount ? styles.activeAccount : '';
      return (
        <Dropdown.Item
          key={account.username}
          className={classes}
          onClick={() => onAccountClick(account.username)}
        >
          {account.username}
        </Dropdown.Item>
      )
    })
  );
}

AccountSelector.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  activeAccount: PropTypes.string.isRequired,
  accounts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: selectors.auth.isLoggedIn(state),
    activeAccount: selectors.auth.activeAccountName(state),
    accounts: selectors.auth.getAccounts(state),
  };
}

export default connect(
  mapStateToProps,
  {onAccountClick: setActiveAccount},
)(AccountSelector);
