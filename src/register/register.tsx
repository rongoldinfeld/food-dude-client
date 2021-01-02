import { MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import history from '../history';
import { Areas, areaToDisplayName } from '../models/area.model';
import { UserContext } from '../providers/user-provider';
import ErrorMessage from '../shared/utils/error-message';
import { unauthorizedApi } from '../shared/utils/http-client';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const authContext = useContext(UserContext);

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      city: '',
      area: Areas.Center,
      houseNumber: 0,
      street: '',
    },
  });

  const onSubmit = async (data: any) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      address: {
        city: data.city,
        area: data.area,
        houseNumber: data.houseNumber,
        street: data.street,
      },
    };
    unauthorizedApi.post('/auth/register', formData).then(async (response) => {
      await authContext.login({ email: formData.email, password: formData.password });
      history.push('/restaurants');
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: {
                    message: 'Required',
                    value: true,
                  },
                  minLength: {
                    value: 2,
                    message: 'Minimum of 2 charachters',
                  },
                })}
                autoComplete="given-name"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <ErrorMessage errors={errors} name="firstName" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: {
                    message: 'Required',
                    value: true,
                  },
                  minLength: {
                    value: 2,
                    message: 'Minimum of 2 charachters',
                  },
                })}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
              <ErrorMessage errors={errors} name="lastName" />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <ErrorMessage errors={errors} name="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ErrorMessage errors={errors} name="password" />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="area"
                control={control}
                as={
                  <TextField
                    id="standard-select"
                    variant="outlined"
                    select
                    fullWidth
                    label="Select"
                  >
                    {Object.keys(Areas).map((area, index) => (
                      // @ts-ignore
                      <MenuItem key={index} value={Areas[area]}>
                        {
                          // @ts-ignore
                          areaToDisplayName[Areas[area]]
                        }
                      </MenuItem>
                    ))}
                  </TextField>
                }
              />
              <ErrorMessage errors={errors} name="area" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                inputRef={register({
                  required: {
                    message: 'This address part is required',
                    value: true,
                  },
                })}
                autoComplete="address-level2"
                name="city"
                variant="outlined"
                fullWidth
                id="city"
                label="City"
              />
              <ErrorMessage errors={errors} name="city" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                inputRef={register({
                  required: {
                    message: 'This address part is required',
                    value: true,
                  },
                })}
                autoComplete="address-line1"
                name="street"
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
              />
              <ErrorMessage errors={errors} name="steet" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                inputRef={register({
                  required: {
                    message: 'This address part is required',
                    value: true,
                  },
                })}
                name="houseNumber"
                variant="outlined"
                required
                fullWidth
                id="houseNumber"
                label="House Num"
                autoComplete="address-line2"
              />
              <ErrorMessage errors={errors} name="houseNumber" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
