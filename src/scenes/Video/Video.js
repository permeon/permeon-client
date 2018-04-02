import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Container, Segment, Header, Label, Item, Dimmer, Loader } from 'semantic-ui-react';
import _ from 'lodash';

import RelatedVideos from './RelatedVideos';
import VideoEmbed from './VideoEmbed';
import Avatar from '../../components/Avatar/Avatar';
import Comments from '../../components/Comments/Comments';
import UpvoteButton from '../../components/Buttons/UpvoteButton';
import DownvoteButton from '../../components/Buttons/DownvoteButton';
import { getVideoState } from '../../actions/videoActions';
import { selectors } from '../../reducers';
import { countVotes } from '../../helpers/videoHelpers';
import { subscriptionCount } from '../../actions/subscriptionsActions';
import { rootComments } from '../../helpers/commentHelpers';
import Reaction from '../../components/Reaction/Reaction';
import TimeAgo from '../../components/TimeAgo/TimeAgo';

class Video extends Component {
  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  fetchData(props) {
    const { tag, channel, permlink, dispatch, video, comments, subscriberCount } = props;
    if (!video) {
      dispatch(getVideoState(tag, channel, permlink));
    }
    if (subscriberCount < 0) {
      dispatch(subscriptionCount(channel));
    }
    // if (!comments) {
    // dispatch(fetchComments(channel, permlink));
    // }
  }

  render() {
    const { video, comments } = this.props;

    if (!video) {
      return (
        <Dimmer active>
          <Loader size="massive" />
        </Dimmer>
      );
    }

    const { upvotes, downvotes } = countVotes(video.active_votes);

    const tags = _.get(video.json_metadata, 'tags', []).map(tag => (
      <Label key={tag} style={{ backgroundColor: '#E0E0E0' }}>
        {tag}
      </Label>
    ));

    return (
      <Container style={{ maxWidth: '1400px', marginTop: '30px', width: '100%', padding: '20px' }}>
        <Grid>
          <Grid.Column computer={11} tablet={16}>
            <Segment basic style={{ paddingTop: 0 }}>
              <VideoEmbed src={video.videoData.url} />
            </Segment>
            <Segment vertical style={{}}>
              <Header as="h3">{video.title}</Header>
              <div>{tags}</div>
              <div style={{ textAlign: 'right' }}>
                <Reaction />
                <UpvoteButton upvotes={upvotes} />
                <DownvoteButton downvotes={downvotes} />
              </div>
            </Segment>

            <Segment vertical>
              <Item.Group>
                <Item>
                  <Avatar username={video.author} style={{ width: '48px', height: '48px' }} />
                  <Item.Content>
                    <Link to={`/channel/${video.author}`} style={{ color: 'inherit' }}>
                      <Item.Header as="h5">{video.author}</Item.Header>
                    </Link>
                    <Item.Meta>
                      published <TimeAgo date={video.created} />
                    </Item.Meta>
                    <Item.Description>{video.videoData.description}</Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>

            <Segment vertical>
              <Comments rootComments={rootComments(comments)} comments={comments} />
            </Segment>
          </Grid.Column>
          <Grid.Column computer={5} only="computer">
            <RelatedVideos video={video} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Video.propTypes = {};

function mapStateToProps(state, ownProps) {
  let { tag, channel, permlink } = ownProps.match.params;
  const activeAccount = selectors.auth.activeAccountName(state);
  channel = channel.replace('@', '');
  return {
    // video: {
    //   pending_payout: '7.419 SBD',
    // },
    subscribersCount: selectors.subscriptions.subscriberCount(state, channel),
    comments: selectors.comments.all(state, channel, permlink) || [],
    video: selectors.video.video(state, channel, permlink),
    activeAccount,
    tag,
    channel,
    permlink
  };
}

export default connect(mapStateToProps)(Video);
