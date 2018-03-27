import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Container, Divider } from 'semantic-ui-react';

import { selectors } from '../../reducers';
import ChannelBanner from "./ChannelBanner";
import ChannelAbout from "./ChannelAbout";
import ChannelVideos from "./ChannelVideos";
import {channelVideos} from "../../actions/channelActions";
import styles from './Channel.css';

class Channel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'VIDEOS',
      videos: [
        // {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
        //         {
        //   url: '/channel/elimence/fwt6reux',
        //   title: 'Music talk: Samplers, limitations, creativity, meditation, spirituality.',
        //   username: 'elimence',
        //   thumbnail: 'https://snap1.d.tube/ipfs/QmT2CbjZ7tv312ZZ42owPxx9nx9xfEWShGsZqDemYEjec6',
        //   playtime: '09:07',
        //   rewards: '$16.516',
        //   date: '5 hours ago',
        // },
      ],
    };
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  componentDidMount() {
    console.log('mounting my dude');
    this.props.dispatch(channelVideos('elimence'));
  }

  onMenuClick(event, {name}) {
    this.setState({ activeTab: name });
  }

  renderActive(activeTab) {
    if (activeTab === 'VIDEOS') {
      return <ChannelVideos videos={this.props.videos} />;
    } else if (activeTab === 'ABOUT') {
      return <ChannelAbout />;
    }
      return null;
  }

  render() {
    const { username } = this.props;
    const { activeTab } = this.state;
    // TODO: put urls into config
    const bannerUrl = 'https://img.esteem.ws/jz7gqt5t2c.jpg';
    const avatarUrl = `https://steemitimages.com/u/${username}/avatar/`;

    return (
      <div>
        <ChannelBanner
          username={username}
          bannerUrl={bannerUrl}
          avatarUrl={avatarUrl}
          onSubscribe={() => alert('not implemented')}
        />
        <Container className={styles.ContentContainer}>
          <Menu pointing secondary tabular attached='top' className={styles.ChannelMenu}>
            <Menu.Item name='VIDEOS' active={activeTab === 'VIDEOS'} onClick={this.onMenuClick} />
            <Menu.Item name='ABOUT' active={activeTab === 'ABOUT'} onClick={this.onMenuClick} />
          </Menu>
          {this.renderActive(activeTab)}
        </Container>
      </div>
    );
  }
}

Channel.propTypes = {};

function mapStateToProps(state, ownProps) {
  const username = ownProps.match.params.username;
  return {
    username,
    videos: selectors.channels.allVideos(state, username),
  }
}

export default connect(mapStateToProps)(Channel);
