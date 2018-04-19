import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, Loader } from 'semantic-ui-react';

import { selectors } from '../../reducers';
import { fetchFeed, fetchHot, fetchCreated, fetchTrending } from '../../actions/videosActions';
import GridVideoCardLayout from '../../components/VideoCards/GridVideoCardLayout';
import GridVideoCards from '../../components/VideoCards/GridVideoCards';
import styles from './Home.css';

class Home extends Component {
  componentDidMount() {
    if (!this.props.trendingVideos.length) {
      this.props.dispatch(fetchTrending('dtube', 12));
    }
    if (!this.props.newVideos.length) {
      this.props.dispatch(fetchCreated('dtube', 12));
    }
    if (!this.props.hotVideos.length) {
      this.props.dispatch(fetchHot('dtube', 12));
    }
    if (!this.props.subscriptionVideos.length) {
      this.props.dispatch(fetchFeed(this.props.username, 50));
    }
  }

  render() {
    const {
      isLoggedIn,
      trendingVideos,
      newVideos,
      hotVideos,
      subscriptionVideos,
      trendingVideosLoading,
      newVideosLoading,
      hotVideosLoading,
      subscriptionVideosLoading
    } = this.props;
    return (
      <div>
        {isLoggedIn && <GridVideoCardLayout style={{ marginTop: '30px' }}>
          <Header as="h3">Subscriptions</Header>
          <GridVideoCards videos={subscriptionVideos} />
          <Loader inline active={subscriptionVideosLoading} />
          <br />
          {!subscriptionVideosLoading && <Link to="/feed">SHOW MORE</Link>}
          <Divider />
        </GridVideoCardLayout> }
        <GridVideoCardLayout style={{ marginTop: '30px' }}>
          <Header as="h3">Trending</Header>
          <GridVideoCards videos={trendingVideos} />
          <Loader inline active={trendingVideosLoading} />
          <br />
          {!trendingVideosLoading && <Link to="/trending">SHOW MORE</Link>}
          <Divider />
        </GridVideoCardLayout>
        <GridVideoCardLayout style={{ marginTop: '30px' }}>
          <Header as="h3">Hot</Header>
          <GridVideoCards videos={hotVideos} />
          <Loader inline active={hotVideosLoading} />
          <br />
          {!hotVideosLoading && <Link to="/hot">SHOW MORE</Link>}
          <Divider />
        </GridVideoCardLayout>
        <GridVideoCardLayout style={{ marginTop: '30px' }}>
          <Header as="h3">New</Header>
          <GridVideoCards videos={newVideos} />
          <Loader inline active={newVideosLoading} />
          <br />
          {!newVideosLoading && <Link to="/new">SHOW MORE</Link>}
          <Divider />
        </GridVideoCardLayout>
      </div>
    );
  }
}

Home.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    username: selectors.auth.activeAccountName(state),
    // username: 'davidpakman',
    trendingVideos: selectors.videos.trending(state),
    newVideos: selectors.videos.created(state),
    hotVideos: selectors.videos.hot(state),
    subscriptionVideos: selectors.videos.feed(state),
    trendingVideosLoading: selectors.videos.isLoading(state, 'trending'),
    newVideosLoading: selectors.videos.isLoading(state, 'created'),
    hotVideosLoading: selectors.videos.isLoading(state, 'hot'),
    subscriptionVideosLoading: selectors.videos.isLoading(state, 'feed'),
    isLoggedIn: selectors.auth.isLoggedIn(state),
  };
}

export default connect(mapStateToProps)(Home);
