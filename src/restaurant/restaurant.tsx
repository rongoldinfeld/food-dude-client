import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Restaurant } from '../models/restaurant.model';
import { Review } from '../models/review.model';
import { useFetch } from '../shared/utils/fetch-hook';
import { apiInstance } from '../shared/utils/http-client';
import ReviewsList from './reviews-list/reviews-list';
import {
  closeConnection,
  createSocket,
  listenToBlockReviewChange,
  sendTestMessage,
} from '../shared/utils/socket-client';
import { getToken } from '../auth/token-utils';
import { UserContext } from '../providers/user-provider';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
  },
  warning: {
    direction: 'rtl',
  },
}));

export default function Resturant() {
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(UserContext);

  const classes = useStyles();

  async function fetchRestaurant(restaurantId: string): Promise<Restaurant> {
    const response = await apiInstance.get(`/restaurants/search/${restaurantId}`);
    return response.data;
  }

  const fetchRestaurantCallback = useCallback(async () => {
    return await fetchRestaurant(id);
  }, [id]);

  const [{ data, isLoading, isError, setData }] = useFetch<Restaurant>({
    initialData: {} as Restaurant,
    request: fetchRestaurantCallback,
  });

  useEffect(() => {
    if (data._id && authContext.socket) {
      listenToBlockReviewChange(authContext.socket, data._id, ({ reviewsBlocked }) =>
        setData({
          ...data,
          reviewsBlocked,
        })
      );
    }
  }, [data]);

  const addReview = (review: Review) => setData({ ...data, reviews: [...data.reviews, review] });

  const editReview = (review: Review) =>
    setData({
      ...data,
      reviews: data.reviews.map((element) => (element._id === review._id ? review : element)),
    });

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="warning" className={classes.warning}>
          <AlertTitle>אזהרה</AlertTitle>
          לא הצלחנו לטעון את המסעדה המבוקשת
        </Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <img alt={data.name} src={data.imageUrl} />
          </Grid>
          <Grid item xs={12} sm container direction="column">
            <Grid item xs container spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h2">
                  {data.name}
                </Typography>
                <Typography variant="body2">Description: {data.description}</Typography>
                <Typography>
                  {`Address: ${data.address.city}, ${data.address.street} ${data.address.houseNumber}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Rating name="read-only" value={data.rating} readOnly />
                </Typography>
                <ReviewsList
                  disabled={data.reviewsBlocked}
                  editReview={editReview}
                  reviews={data.reviews}
                  addReview={addReview}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
