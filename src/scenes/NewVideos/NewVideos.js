import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, Loader } from 'semantic-ui-react';

import { selectors } from '../../reducers';
import { fetchCreated } from '../../actions/videosActions';
import GridVideoCardLayout from '../../components/VideoCards/GridVideoCardLayout';
import GridVideoCards from '../../components/VideoCards/GridVideoCards';

class NewVideos extends Component {
  componentDidMount() {
    if (!this.props.videos.length) {
      this.props.dispatch(fetchCreated('dtube', 20));
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
          <Header as="h3">New</Header>
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

NewVideos.propTypes = {};

function mapStateToProps(state) {
  return {
    username: selectors.auth.activeAccountName(state),
    videos: selectors.videos.created(state),
    isVideosLoding: selectors.videos.isLoading(state, 'created'),
  };
}

export default connect(mapStateToProps)(NewVideos);
