import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

const EMOJI_SHEET = 'emojione';

class Reaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emojis: [],
      pickerOpen: true,
    };
    this.addEmoji = this.addEmoji.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
  }

  addEmoji(emoji) {
    console.log('adding:', emoji);
    this.setState(prevState => ({
      emojis: [...prevState.emojis, emoji],
    }));
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
    return (
      <div style={{float: 'right', position: 'relative', zIndex: '2000'}}>
        <div>
          {this.renderEmojis(this.state.emojis)}
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
        {/*<Picker style={{position: 'absolute', bottom: '20px', right: '20px'}}/>*/}
      </div>
    );
  }
};

Reaction.propTypes = {

};

export default Reaction;
