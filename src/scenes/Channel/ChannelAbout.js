import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';

const ChannelAbout = ({ userData }) => {
  return (
    <Grid style={{ marginTop: '12px' }}>
      <Grid.Column width={12}>
        <Segment>Username:</Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <Segment>Right seg</Segment>
      </Grid.Column>
    </Grid>
  );
};

ChannelAbout.propTypes = {};

export default ChannelAbout;
