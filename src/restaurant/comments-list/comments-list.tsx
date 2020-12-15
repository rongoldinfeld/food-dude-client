import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Comment } from '../../models/comment.model';
import CommentItem from './comment/comment-item';
import { CardHeader } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    card: {
      width: '75%',
      margin: '0 auto',
    },
  })
);

function CommentsList({ comments }: { comments: Comment[] }) {
  const classes = useStyles();
  const lastIndex = comments.length - 1;

  return (
    <Card className={classes.card}>
      <CardHeader title={`Comments (${comments.length})`}>
        <Divider variant="middle" component="li" />
      </CardHeader>
      <CardContent>
        <List className={classes.root}>
          {comments.map((comment, index) =>
            index !== lastIndex ? (
              <div>
                <CommentItem key={comment.id} comment={comment} />
                <Divider variant="middle" component="li" />
              </div>
            ) : (
              <CommentItem key={comment.id} comment={comment} />
            )
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default CommentsList;
