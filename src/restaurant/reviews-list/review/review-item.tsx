import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { Review } from '../../../models/review.model';
import { longDateFormat } from '../../../shared/utils/date-formats';

export default function ReviewItem({ review }: { review: Review }) {
  const useStyles = makeStyles(() => ({
    inline: {
      display: 'inline',
      width: '100%',
    },
  }));

  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{review.user.slice(0, 1)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography component="span" color="textPrimary">
              {`${review.user} - `}
            </Typography>
            <Typography component="span" color="textSecondary">
              {moment(review.createdAt).format(longDateFormat)}
            </Typography>
          </React.Fragment>
        }
        secondary={review.content}
      />
    </ListItem>
  );
}
