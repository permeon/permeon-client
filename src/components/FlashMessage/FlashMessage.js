import React, { Component } from "react";
import PropTypes from "prop-types";

import { Message, Transition } from "semantic-ui-react";

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const flashTime = this.props.flashTime || 3000;
    this.timeoutID = setTimeout(this.handleClose, flashTime);
    // this.setState({isVisible: true})
  }

  handleClose() {
    this.setState({ isVisible: false });
    clearTimeout(this.timeoutID);
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { header, content, color, children } = this.props;
    return (
      <Transition
        visible={this.state.isVisible}
        transitionOnMount={true}
        unmountOnHide={true}
        animation="scale"
        duration={600}
      >
        <Message
          visible
          onDismiss={this.handleClose}
          header={header}
          content={content}
          color={color}
          {...children}
        />
      </Transition>
    );
  }
}

FlashMessage.propTypes = {};

export default FlashMessage;
