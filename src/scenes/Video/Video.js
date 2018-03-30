import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Grid, Container, Segment, Header, Label, Item, Dimmer, Loader } from 'semantic-ui-react';
import _ from 'lodash';

import RelatedVideos from "./RelatedVideos";
import VideoEmbed from "./VideoEmbed";
import Avatar from "../../components/Avatar/Avatar";
import Comments from "../../components/Comments/Comments";
import UpvoteButton from "../../components/Buttons/UpvoteButton";
import DownvoteButton from "../../components/Buttons/DownvoteButton";
import {getVideoState} from "../../actions/videoActions";
import {selectors} from "../../reducers";
import {countVotes} from "../../helpers/videoHelpers";
import {subscriptionCount} from "../../actions/subscriptionsActions";

class Video extends Component {
  componentDidMount() {
    const { channel, permlink, dispatch } = this.props;
    dispatch(getVideoState(channel, permlink));
    dispatch(subscriptionCount(channel));
  }

  render() {
    const { video } = this.props;

    if (!video) {
      return (
        <Dimmer active>
          <Loader size='massive' />
        </Dimmer>
      );
    }

    const { upvotes, downvotes } = countVotes(video.active_votes);

    const tags = _.get(video.json_metadata, 'tags', []).map(tag => (
      <Label key={tag} style={{backgroundColor: '#E0E0E0'}} >{tag}</Label>
    ));

    return (
      <Container style={{maxWidth: '1400px', marginTop: '30px', width: '100%', padding: '20px'}}>
        <Grid>
          <Grid.Column computer={11} tablet={16}>
            <Segment basic style={{paddingTop: 0}}>
              {/*<VideoEmbed video={video}/>*/}
            </Segment>
            <Segment vertical style={{}}>
              <Header as='h3'>{video.title}</Header>
              <div>{tags}</div>
              <div style={{textAlign: 'right'}}>
                <UpvoteButton upvotes={upvotes} />
                <DownvoteButton downvotes={downvotes} />
              </div>
            </Segment>

            <Segment vertical>
              <Item.Group>
                <Item>
                  <Avatar username={video.author} style={{width: '48px', height: '48px'}} />
                  <Item.Content>
                    <Item.Header as='h5'>{video.author}</Item.Header>
                    <Item.Meta>{video.created}</Item.Meta>
                    <Item.Description>
                      {video.body}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>

            <Segment vertical>
              <Comments comments={[]} />
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
  const channel = ownProps.match.params.username;
  const permlink = ownProps.match.params.permlink;
  const activeAccount = selectors.auth.activeAccountName(state);
  return {
    // video: {
    //   pending_payout: '7.419 SBD',
    // },
    subscribers: selectors.subscriptions.subscriberCount(state, channel),
    comments: [], // TODO
    video: selectors.video.video(state),
    activeAccount,
    channel,
    permlink,
  }
}


export default connect(mapStateToProps)(Video);
