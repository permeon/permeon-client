import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Header } from 'semantic-ui-react';
import classNames from 'classnames';

import styles from './StackedVideoCard.css';
import TimeAgo from "../TimeAgo/TimeAgo";
import {formatRewards} from "../../helpers/rewardsHelpers";

const StackedVideoCard = ({
  url,
  title,
  username,
  thumbnail,
  playtime,
  rewards,
  date,
  app,
}) => {
  return (
    <div className={styles.StackedVideoCard}>
      <Link to={url} style={{float: 'left', position: 'relative', marginRight: '8px'}}>
        <Image src={thumbnail} />
        <span className={styles.Playtime}>{playtime}</span>
      </Link>
      <div style={{position: 'relative'}}>
        <Link to={url}>
          <Header as='h5'>{title}</Header>
        </Link>
        <Link to={`/channel/${username}`} className={classNames(styles.AuthorLink, 'red')}>{username}</Link>
        <div>
          <span className={styles.Rewards}>{formatRewards(rewards)}</span>
          <span className={styles.Date}><TimeAgo date={date}/></span>
        </div>
      </div>
    </div>
  );
};

StackedVideoCard.propTypes = {

};

export default StackedVideoCard;
