import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Comment } from '../../../models/comment.model';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export default function CommentItem({ comment }: { comment: Comment }) {
  const useStyles = makeStyles(() =>
    createStyles({
      inline: {
        display: 'inline',
      },
    })
  );

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{comment.name.slice(0, 1)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment.brief + '...'}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {comment.name}
            </Typography>
            {' - ' + comment.description}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
