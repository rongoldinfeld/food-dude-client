import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import feedMock from './feed-mock';
import FeedItem from './feed-item/feed-item';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Feed() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} cols={4}>
                {feedMock.map((restaurant) =>
                    <FeedItem key={restaurant.id} restaurant={restaurant}></FeedItem>
                )}
            </GridList>
        </div>
    );
}
