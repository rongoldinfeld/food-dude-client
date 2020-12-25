import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Restaurant } from '../../models/restaurant.model';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  img: {
    width: 128,
    height: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function RestaurantFeedItem(props: { restaurant: Restaurant }) {
  const classes = useStyles();
  const history = useHistory();

  const handleOnTileClick = () => history.push(`/restaurants/${props.restaurant._id}`);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <img
            className={classes.img}
            alt={props.restaurant.name}
            src={props.restaurant.imageUrl}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {props.restaurant.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.restaurant.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <Rating name="read-only" value={props.restaurant.rating} readOnly />
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: 'pointer' }} onClick={handleOnTileClick}>
                Show more
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
