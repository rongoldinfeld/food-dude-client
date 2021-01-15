import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Review } from '../../models/review.model';
import ReviewForm from './review-form';
import ReviewItem from './review/review-item';

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
      width: '100%',
      maxHeight: '325px',
      overflowY: 'scroll',
    },
    disabled: {
      width: '100%',
      maxHeight: '325px',
      overflowY: 'scroll',
      cursor: 'disabled',
      opacity: '0.5',
    },
  })
);

function ReviewsList({
  reviews,
  addReview,
  editReview,
  disabled,
}: {
  reviews: Review[];
  addReview: (review: Review) => void;
  editReview: (review: Review) => void;
  disabled: boolean;
}) {
  const classes = useStyles();
  const lastIndex = reviews.length - 1;
  return (
    <Card className={disabled ? classes.disabled : classes.card}>
      <CardHeader title={`Reviews (${reviews.length})`}>
        <Divider variant="middle" component="li" />
      </CardHeader>
      <CardContent>
        <List className={classes.root}>
          {reviews.map((review, index) =>
            index !== lastIndex ? (
              <div key={review._id}>
                <ReviewItem disabled={disabled} onEditSuccess={editReview} review={review} />
                <Divider variant="middle" component="li" />
              </div>
            ) : (
              <ReviewItem
                disabled={disabled}
                onEditSuccess={editReview}
                key={review._id}
                review={review}
              />
            )
          )}
        </List>
      </CardContent>
      <ReviewForm disabled={disabled} onSuccess={addReview} />
    </Card>
  );
}

export default ReviewsList;
