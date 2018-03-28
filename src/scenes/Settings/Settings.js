import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';

class Settings extends Component {
  render() {
    return (
      <Container text style={{paddingTop: '50px'}}>
        <Segment>
          Cool
        </Segment>
      </Container>
    );
  }
}

Settings.propTypes = {};

export default Settings;
