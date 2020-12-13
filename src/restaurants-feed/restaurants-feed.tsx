import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import restaurantMocks from './restaurants-mock';
import RestaurantFeedItem from './restaurant-feed-item/restaurant-feed-item';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function RestaurantsFeed() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} cols={4}>
        {restaurantMocks.map((restaurant) => (
          <RestaurantFeedItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </GridList>
    </div>
  );
}
