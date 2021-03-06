import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Header, Button } from 'semantic-ui-react';

import styles from './ChannelBanner.css';
import Avatar from '../../components/Avatar/Avatar';

// TODO: Put styles in css file and fix positioning
const ChannelBanner = ({
  username,
  bannerUrl,
  avatarUrl,
  isSubscribed,
  onSubscribe,
  onUnSubscribe,
  isSubButtonLoading
}) => {
  return (
    <div className={styles.ChannelBanner}>
      {/*<Image src={bannerUrl} className={styles.BannerImage} />*/}
      <Container style={{ paddingTop: '10px', position: 'relative' }}>
        <Image
          src={avatarUrl}
          circular
          style={{ height: '80%' }}
          verticalAlign="middle"
          floated="left"
        />
        <Header
          as="h3"
          style={{ position: 'relative', marginTop: '100px' }}
          floated="left"
          inverted
        >
          {username}
        </Header>
        {isSubscribed ? (
          <Button
            floated="right"
            onClick={onUnSubscribe}
            style={{ marginTop: '80px' }}
            loading={isSubButtonLoading}
            disabled={isSubButtonLoading}
          >
            UNSUBSCRIBE
          </Button>
        ) : (
          <Button
            floated="right"
            color="red"
            onClick={onSubscribe}
            style={{ marginTop: '80px' }}
            loading={isSubButtonLoading}
            disabled={isSubButtonLoading}
          >
            SUBSCRIBE
          </Button>
        )}
      </Container>
    </div>
  );
};

ChannelBanner.propTypes = {};

export default ChannelBanner;
