import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { Restaurant } from '../models/restaurant.model';
import { useFetch } from '../shared/utils/fetch-hook';
import { apiInstance } from '../shared/utils/http-client';
import Filters from './filters/filters';
import RestaurantFeedItem from './restaurant-feed-item/restaurant-feed-item';

const useStyles = makeStyles((theme) => ({
  feed: {
    width: '90%',
    margin: '0 auto',
  },
  filters: {
    marginTop: '2%',
  },
}));

export default function RestaurantsFeed() {
  const classes = useStyles();

  const fetchRestaurants = async (): Promise<Restaurant[]> => {
    const response = await apiInstance.get('/restaurants');
    return response.data.map((res: Restaurant) => ({ ...res, rating: res.rating / 2 }));
  };

  const [{ data, isLoading, isError }] = useFetch<Restaurant[]>({
    initialData: [],
    request: fetchRestaurants,
  });

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="warning">
          <AlertTitle>אזהרה</AlertTitle>
          לא הצלחנו לטעון את רשימת המסעדות
        </Alert>
      ) : (
        <Grid container direction="column" spacing={2} className={classes.feed}>
          <Grid item className={classes.filters}>
            <Filters />
          </Grid>
          <Grid item container spacing={0}>
            {data.map((restaurant) => (
              <RestaurantFeedItem key={restaurant._id} restaurant={restaurant} />
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
