import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Comment } from '../../models/comment.model';
import CommentItem from './comment/comment-item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

function CommentsList({ comments }: { comments: Comment[] }) {
  const classes = useStyles();
  const lastIndex = comments.length - 1;

  return (
    <List className={classes.root}>
      {comments.map((comment, index) =>
        index !== lastIndex ? (
          <div>
            <CommentItem key={comment.id} comment={comment} />
            <Divider variant="inset" component="li" />
          </div>
        ) : (
          <CommentItem key={comment.id} comment={comment} />
        )
      )}
    </List>
  );
}

export default CommentsList;
