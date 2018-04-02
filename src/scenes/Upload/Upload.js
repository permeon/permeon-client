import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Header, Grid, Container } from "semantic-ui-react";
import UploadForm from "./UploadForm";

class Upload extends Component {

  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }


  handleRedirect(videoUrl) {
    this.props.history.push(videoUrl);
  }

  render() {
    return (
      <Container text style={{paddingTop: '50px'}}>
        <Header as='h2' textAlign='center'>Upload Video</Header>
        <UploadForm dispatch={this.props.dispatch} redirect={this.handleRedirect} />
      </Container>
    );
  }
}

Upload.propTypes = {};

export default Upload;
