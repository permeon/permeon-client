import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, Loader } from 'semantic-ui-react';

import { selectors } from '../../reducers';
import { fetchTrending } from '../../actions/videosActions';
import GridVideoCardLayout from '../../components/VideoCards/GridVideoCardLayout';
import GridVideoCards from '../../components/VideoCards/GridVideoCards';

class TrendingVideos extends Component {
  componentDidMount() {
    if (!this.props.videos.length) {
      this.props.dispatch(fetchTrending('dtube', 20));
    }
  }

  render() {
    const {
      videos,
      isVideosLoading,
    } = this.props;
    return (
      <div>
        <GridVideoCardLayout style={{ marginTop: '30px' }}>
          <Header as="h3">Trending</Header>
          <GridVideoCards videos={videos} />
          <Loader inline='centered' active={isVideosLoading} />
          <br />
          {/*{!hotVideosLoading && <Link to="/hot">SHOW MORE</Link>}*/}
          {/*<Divider />*/}

        </GridVideoCardLayout>
      </div>
    );
  }
}

TrendingVideos.propTypes = {};

function mapStateToProps(state) {
  return {
    username: selectors.auth.activeAccountName(state),
    videos: selectors.videos.trending(state),
    isVideosLoading: selectors.videos.isLoading(state, 'trending'),
  };
}

export default connect(mapStateToProps)(TrendingVideos);
