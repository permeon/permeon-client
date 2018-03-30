import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Grid, Container, Segment, Embed } from 'semantic-ui-react';

import RelatedVideos from "./RelatedVideos";
import VideoEmbed from "./VideoEmbed";

class Video extends Component {
  render() {
    const { video } = this.props;

    return (
      <Container style={{maxWidth: '1400px', marginTop: '30px', width: '100%', padding: '20px'}}>
        <Grid>
          <Grid.Column computer={11} tablet={16}>
            <Segment basic>
              <VideoEmbed video={video}/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={5} only='computer'>
            <RelatedVideos video={video} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Video.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    video: {
      url: 'kOLSDsjeSIE',
    },
  }
}


export default connect(mapStateToProps)(Video);
