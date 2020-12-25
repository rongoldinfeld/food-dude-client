import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../providers/user-provider';
import AutoCompleteSearchInput from './search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#f5deb3',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(UserContext);
  const handleOnLogin = () => history.push('/login');
  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">Food Dude</Typography>
          </Link>
          <AutoCompleteSearchInput disabled={!authContext.user} />
          {authContext.user ? (
            <div>
              <Typography>
                Hey there, {`${authContext.user.firstName} ${authContext.user.lastName}`}
              </Typography>
              <Link to="/restaurants" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          ) : (
            <Button onClick={handleOnLogin} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
