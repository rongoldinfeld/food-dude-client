import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import AreaFilter from './area-filter';
import CategoryFilter from './category-filter';
import DescriptionFilter from './city-filter';
import RatingFilter from './rating-filter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '100%',
    },
  })
);
export default function Filters() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <CategoryFilter />
        </Grid>
        <Grid item xs={2}>
          <AreaFilter />
        </Grid>
        <Grid item xs={3}>
          <DescriptionFilter />
        </Grid>
        <Grid item xs={2}>
          <RatingFilter />
        </Grid>
        <Grid item xs={2} direction="row" alignItems="center">
          <Button variant="outlined" color="primary">
            Filter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
