import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header } from 'semantic-ui-react';

import {selectors} from "../../reducers";
import GridVideoCardLayout from "../../components/VideoCards/GridVideoCardLayout";
import GridVideoCards from "../../components/VideoCards/GridVideoCards";
import styles from './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <GridVideoCardLayout style={{marginTop: '20px'}}>
          <Header as='h3'>Trending</Header>
          <GridVideoCards videos={this.props.videos} />
          <Link to='/trending'>SHOW MORE</Link>
          <Divider />
        </GridVideoCardLayout>
        <GridVideoCardLayout style={{marginTop: '20px'}}>
          <Header as='h3'>Hot</Header>
          <GridVideoCards videos={this.props.videos} />
          <Link to='/hot'>SHOW MORE</Link>
          <Divider />
        </GridVideoCardLayout>
      </div>
    );
  }
}

Home.propTypes = {};

function mapStateToProps(state, ownProps) {
  const username = 'haejin';
  return {
    videos: selectors.channels.allVideos(state, username),
  }
}

export default connect(mapStateToProps)(Home);
