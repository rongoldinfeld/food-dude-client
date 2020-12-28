import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { FilterFields } from '../../models/filters.model';
import AreaFilter from './area-filter';
import CategoryFilter from './category-filter';
import DescriptionFilter from './description-filter';
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
export default function Filters({
  value,
  changeFilter,
}: {
  value: FilterFields;
  changeFilter: (change: Partial<FilterFields>) => void;
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <CategoryFilter
            onCategoryChange={(category) => changeFilter({ category })}
            value={value.category}
          />
        </Grid>
        <Grid item xs={3}>
          <AreaFilter onAreaChange={(area) => changeFilter({ area })} value={value.area} />
        </Grid>
        <Grid item xs={3}>
          <DescriptionFilter
            onDescriptionChange={(description) => changeFilter({ description })}
            value={value.description}
          />
        </Grid>
        <Grid container item xs={3} direction="row" justify="center" alignItems="center">
          <RatingFilter
            onRatingChange={(rating) => changeFilter({ minRating: rating })}
            value={value.minRating}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
