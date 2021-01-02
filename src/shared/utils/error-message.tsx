import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  errorMessage: {
    color: 'red',
  },
}));

export default function ErrorMessage({
  errors,
  name: key,
}: {
  errors: DeepMap<{ [key: string]: any }, FieldError>;
  name: string;
}) {
  const classes = useStyles();
  return errors[key] ? (
    <div className={`${classes.errorMessage} mandatory`}>{errors[key].message}</div>
  ) : null;
}
