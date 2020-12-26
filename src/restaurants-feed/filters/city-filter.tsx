import { createStyles, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      width: '100%',
    },
  })
);

export default function DescriptionFilter() {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      id="outlined-search"
      label="Description"
      type="search"
      variant="outlined"
    />
  );
}
