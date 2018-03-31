import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import {postReaction} from "../../actions/reactionsActions";
import {selectors} from "../../reducers";

const EMOJI_SHEET = 'emojione';

class Reaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerOpen: false,
    };
    this.addEmoji = this.addEmoji.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
  }

  addEmoji(emoji) {
    const { channel, permlink, dispatch } = this.props;
    dispatch(postReaction(channel, permlink, emoji));
    console.log('adding:', emoji);
  }

  togglePicker() {
    this.setState(prevState => ({
      pickerOpen: !prevState.pickerOpen,
    }));
  }

  renderEmojis(emojis) {
    return emojis.map(emoji => (
      <Emoji emoji={emoji.id} set={EMOJI_SHEET} size={16} />
    ));
  }

  render() {
    const { emojiReactions } = this.props;
    console.log('emojis:', emojiReactions);
    return (
      <div style={{float: 'right', position: 'relative', zIndex: '2000'}}>
        <div>
          <Button circular icon='circle' floated='right' onClick={this.togglePicker} />
        </div>
        {this.state.pickerOpen &&
          <Picker
            set={EMOJI_SHEET}
            onSelect={this.addEmoji}
            title=''
            style={{position: 'absolute', right: 0, top: '20px'}}
          />
        }
      </div>
    );
  }
};

Reaction.propTypes = {

};

function mapStateToProps(state, ownProps) {
  let { channel, permlink } = ownProps.match.params;
  channel = channel.replace('@', '');
  return {
    channel,
    permlink,
    emojiReactions: selectors.reactions.emojis(state, channel, permlink),
  }
}

export default withRouter(connect(mapStateToProps)(Reaction));
