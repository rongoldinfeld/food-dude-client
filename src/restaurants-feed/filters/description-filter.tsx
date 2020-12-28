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

export default function DescriptionFilter({
  onDescriptionChange,
  value,
}: {
  onDescriptionChange: (description: string) => void;
  value: string;
}) {
  const classes = useStyles();
  return (
    <TextField
      value={value}
      className={classes.textField}
      id="outlined-search"
      label="Description"
      type="search"
      onChange={(event) => onDescriptionChange(event.target.value)}
      variant="outlined"
    />
  );
}
