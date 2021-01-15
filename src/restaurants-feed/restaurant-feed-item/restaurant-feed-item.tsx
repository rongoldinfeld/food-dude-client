import { Grid, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Restaurant } from '../../models/restaurant.model';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '200px',
        height: '300px',
        cursor: 'pointer'
    },
    img: {
        height: '100px',
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }
}));

export default function RestaurantFeedItem(props: { restaurant: Restaurant }) {
    const classes = useStyles();
    const history = useHistory();

    const handleOnTileClick = () => history.push(`/restaurants/${props.restaurant._id}`);

    return (
        <Paper className={classes.paper} onClick={handleOnTileClick}>
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
                            <Typography gutterBottom align='center' variant="subtitle1">
                                {props.restaurant.name}
                            </Typography>
                            <Typography gutterBottom align='center' variant="body2">
                                {props.restaurant.description}
                            </Typography>
                            <Typography gutterBottom align='center' variant="body2" color="textSecondary">
                                <Rating size="small" name="read-only" value={props.restaurant.rating} readOnly/>
                            </Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
