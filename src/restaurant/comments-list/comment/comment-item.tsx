import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { Comment } from '../../../models/comment.model';
import { longDateFormat } from '../../../shared/utils/date-formats';

export default function CommentItem({ comment }: { comment: Comment }) {
  const useStyles = makeStyles(() =>
    createStyles({
      inline: {
        display: 'inline',
        width: '100%',
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
        primary={`${comment.name} on ${moment(comment.date).format(longDateFormat)}`}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {comment.brief + '...'}
            </Typography>
            {' - ' + comment.description}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
