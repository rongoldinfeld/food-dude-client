import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Restaurant } from '../models/restaurant.model';
import { apiInstance } from '../shared/utils/http-client';
import RestaurantFeedItem from './restaurant-feed-item/restaurant-feed-item';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'visible',
  },
}));

export default function RestaurantsFeed() {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState<{ isLoading: boolean; data: Restaurant[] }>({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    apiInstance
      .get('/restaurants')
      .then((response) => setRestaurants({ data: response.data, isLoading: false }))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className={classes.root}>
      {restaurants.isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {restaurants.data.map((restaurant) => (
            <RestaurantFeedItem key={restaurant._id} restaurant={restaurant} />
          ))}
        </Grid>
      )}
    </div>
  );
}
