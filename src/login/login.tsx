import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { ChangeEvent, useState } from 'react';
import { validateEmail } from '../shared/validators/form-validators';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  });

  const isFormValid = (): boolean =>
    formValue.email.error.length === 0 && formValue.password.error.length === 0;

  const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFormValue({
      ...formValue,
      email: {
        value: inputValue,
        error: validateEmail(inputValue) ? '' : 'Email input is incorrect',
      },
    });
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFormValue({
      ...formValue,
      password: {
        value: inputValue,
        error: inputValue.length > 0 ? '' : 'Password field is required',
      },
    });
  };
  const handleFormSubmit = () => alert(`Sending form with value ${JSON.stringify(formValue)}`);
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
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            fullWidth
            value={formValue.email.value}
            error={!!formValue.email.error}
            helperText={formValue.email.error}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={!!formValue.password.error}
            helperText={formValue.password.error}
            onChange={handlePasswordChange}
            fullWidth
            name="password"
            value={formValue.password.value}
            label="Password"
            type="password"
            id="password"
            required
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={!isFormValid()}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
