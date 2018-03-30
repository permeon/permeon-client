import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header } from 'semantic-ui-react';

import Comment from "./Comment";

const Comments = ({
  comments,
}) => {
  return (
    <div>
      <SMComment.Group>
        <Header as='h3' dividing style={{border: 'none'}}>{comments.length} Comments</Header>
        <Comment children={[{id: 22}]}/>
      </SMComment.Group>
    </div>
  );
};

Comments.propTypes = {

};

export default Comments;
