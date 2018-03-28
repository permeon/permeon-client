import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Header } from 'semantic-ui-react';

import SettingsForm from "./SettingsForm";

class Settings extends Component {
  render() {
    return (
      <Container text style={{paddingTop: '50px'}}>
        <Header as='h2' textAlign='center'>Settings</Header>
        <Segment>
          <SettingsForm />
        </Segment>
      </Container>
    );
  }
}

Settings.propTypes = {};

export default Settings;
