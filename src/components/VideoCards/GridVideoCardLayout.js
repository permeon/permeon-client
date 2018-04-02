import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import styles from './GridVideoCardLayout.css';

const GridVideoCardLayout = ({ children, ...rest }) => {
  return (
    <Container className={styles.ContentContainer} {...rest}>
      {children}
    </Container>
  );
};

GridVideoCardLayout.propTypes = {};

export default GridVideoCardLayout;
