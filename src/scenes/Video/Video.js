import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Image, Button, Grid, Container, Segment, Header, Label, Icon, Divider, Item } from 'semantic-ui-react';

import RelatedVideos from "./RelatedVideos";
import VideoEmbed from "./VideoEmbed";
import Avatar from "../../components/Avatar/Avatar";
import Comments from "../../components/Comments/Comments";

class Video extends Component {
  render() {
    const { video } = this.props;
    const tags = video.tags.map(tag => (
      <Label key={tag} style={{backgroundColor: '#E0E0E0'}} >{tag}</Label>
    ));

    return (
      <Container style={{maxWidth: '1400px', marginTop: '30px', width: '100%', padding: '20px'}}>
        <Grid>
          <Grid.Column computer={11} tablet={16}>
            <Segment basic>
              {/*<VideoEmbed video={video}/>*/}
            </Segment>
            <Segment vertical style={{}}>
              <Header as='h3'>{video.title}</Header>
              <div>{tags}</div>
              {/*<div style={{float: 'right'}}>*/}
                <div style={{textAlign: 'right'}}>
                <Button style={{background: 'none'}}>
                  <Icon name='thumbs up'/>
                  {video.upvotes}
                </Button>
                <Button style={{background: 'none'}}>
                  <Icon name='thumbs down'/>
                  {video.downvotes}
                </Button>
              </div>
            </Segment>

            <Segment vertical>
              <Item.Group>
                <Item>
                  <Image circular src={`https://steemitimages.com/u/${video.author}/avatar/`} style={{width: '48px', height: '48px'}}/>
                  <Item.Content>
                    <Item.Header as='h5'>{video.author}</Item.Header>
                    <Item.Meta>{video.date}</Item.Meta>
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
  return {
    video: {
      url: 'kOLSDsjeSIE',
      title: 'Best Countries for Cryptocurrency Investors (0% Tax!)',
      tags: ['crypto', 'bitcoin', 'ethereum', 'investing'],
      upvotes: 73,
      downvotes: 1,
      rewards: '$7.419',
      author: 'louisthomas',
      body: 'In today\'s video, I\'m gonna sharing a list of some of the best countries in the world out there for cryptocurrency investors. In some cases, there are 0% capital gains tax rates!',
      date: 'Mar 20, 2018',
    },
    subscribers: 3906,
    activeAccount: 'okc',
    comments: [],
  }
}


export default connect(mapStateToProps)(Video);
