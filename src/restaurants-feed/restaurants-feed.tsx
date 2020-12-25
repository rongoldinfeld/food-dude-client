import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { Restaurant } from '../models/restaurant.model';
import { useFetch } from '../shared/utils/fetch-hook';
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

  const fetchRestaurants = async (): Promise<Restaurant[]> => {
    const response = await apiInstance.get('/restaurants');
    return response.data;
  };

  const [{ data, isLoading, isError }] = useFetch<Restaurant[]>({
    initialData: [],
    request: fetchRestaurants,
  });

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="warning">
          <AlertTitle>אזהרה</AlertTitle>
          לא הצלחנו לטעון את רשימת המסעדות
        </Alert>
      ) : (
        <Grid container spacing={0}>
          {data.map((restaurant) => (
            <RestaurantFeedItem key={restaurant._id} restaurant={restaurant} />
          ))}
        </Grid>
      )}
    </div>
  );
}
