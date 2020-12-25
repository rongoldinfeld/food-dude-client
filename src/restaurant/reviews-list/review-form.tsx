import {
  Button,
  createStyles,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from '../../models/review.model';
import { apiInstance } from '../../shared/utils/http-client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2%',
    },
  })
);

export default function ReviewForm({ onSuccess }: { onSuccess: (review: Review) => void }) {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState('');
  const [error, setError] = useState(false);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    apiInstance
      .post(
        `/reviews/${id}`,
        { content: review },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((reponse) => {
        onSuccess(reponse.data);
        setError(false);
        setReview('');
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <Grid container spacing={2} className={classes.form}>
      <Grid item>
        <FormControl variant="outlined">
          <TextField
            id="outlined-textarea"
            label="Write your review here"
            placeholder="What you think about the restaurant?"
            multiline={true}
            value={review}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Grid>
      {error && (
        <Grid item>
          <Alert severity="error">מצטערים, קרתה שגיאה בפרסום תגובה</Alert>
        </Grid>
      )}
    </Grid>
  );
}
