import { Backdrop, Button, CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../providers/user-provider';
import ErrorMessage from '../shared/utils/error-message';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  errorMessage: {
    color: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Login() {
  const classes = useStyles();
  const authContext = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!authContext.user) {
      history.push('/restaurants');
    }
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    await authContext.login(data);
    history.push('/restaurants');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth={true}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={true}
            inputRef={register({
              required: {
                value: true,
                message: 'Please enter your email address',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid email address',
              },
              minLength: {
                value: 6,
                message: 'Minimum 6 characters are allowed',
              },
              maxLength: {
                value: 255,
                message: 'Maximum 255 characters are allowed',
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth={true}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({
              required: {
                value: true,
                message: 'Password field is required',
              },
              minLength: {
                value: 5,
                message: 'Password field has minimum of 5 charachters',
              },
            })}
          />
          <ErrorMessage errors={errors} name="password" />
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
