import React from 'react';
import { Formik } from 'formik';
import yup from 'yup';

import { Menu, Segment } from 'semantic-ui-react';
import LinkUpload from './LinkUpload';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUploader: 'linkUploader'
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(event, { name }) {
    console.log(name);
    this.setState({ activeUploader: name });
  }

  activeUploaderForm(activeUploader) {
    switch (activeUploader) {
      case 'linkUploader':
        return <LinkUpload redirect={this.props.redirect} />;
      default:
        return <div>not implemented</div>;
    }
  }

  render() {
    const { activeUploader } = this.state;

    return (
      <Segment clearing>
        <Menu tabular>
          <Menu.Item
            name="linkUploader"
            active={activeUploader === 'linkUploader'}
            onClick={this.handleTabClick}
          />
          <Menu.Item
            name="ipfsUploader"
            active={activeUploader === 'ipfsUploader'}
            onClick={this.handleTabClick}
          />
        </Menu>
        {this.activeUploaderForm(activeUploader)}
      </Segment>
    );
  }
}

export default UploadForm;
