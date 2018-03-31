import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header } from 'semantic-ui-react';

import Comment from "./Comment";
import {countVotes} from "../../helpers/videoHelpers";

const Comments = ({
  comments,
}) => {
  return (
    <div>
      <SMComment.Group>
        <Header as='h3' dividing style={{border: 'none'}}>{comments.length} Comments</Header>
        {comments.map(comment => {
          const { upvotes, downvotes } = countVotes(comment.active_votes);
          return (
            <Comment
              key={comment.author+comment.permlink}
              author={comment.author}
              date={comment.created}
              rewards='$0.944'
              body={comment.body}
              upvotes={upvotes}
              downvotes={downvotes}
              children={[]}
            />
          )
        })}
      </SMComment.Group>
    </div>
  );
};

Comments.propTypes = {

};

export default Comments;
