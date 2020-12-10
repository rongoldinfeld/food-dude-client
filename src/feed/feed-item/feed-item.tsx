import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Restaurant } from '../../models/restaurant.model';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}))


export default function FeedItem(props: { restaurant: Restaurant }) {
    const classes = useStyles();

    const onRestaurantClick = () => {
        alert(`Click on restaurant with id ${props.restaurant.id}`);
    }

    return (
        <GridListTile onClick={onRestaurantClick} {...props}>
            <img src={props.restaurant.img} alt={props.restaurant.name} />
            <GridListTileBar
                title={props.restaurant.name}
                actionIcon={
                    <IconButton aria-label={`info about ${props.restaurant.name}`} className={classes.icon}>
                        <InfoIcon />
                    </IconButton>
                }
            />
        </GridListTile>)
}