import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ authUser }) =>
  authUser ? (
    <NavigationAuth authUser={authUser} />
  ) : (
      <NavigationNonAuth />
    );

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const NavigationNonAuth = withStyles(styles)(({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton component={Link} to={ROUTES.LANDING} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to={ROUTES.LANDING} variant="h6" color="inherit" className={classes.grow} />
          <Button component={Link} to={ROUTES.SIGN_UP} color="inherit">Sign Up</Button>
          <Button component={Link} to={ROUTES.SIGN_IN} color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
});


const NavigationAuth = withStyles(styles)(({ classes, authUser }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to={ROUTES.LANDING} variant="h6" color="inherit" className={classes.grow}/>
          <Button component={Link} to={ROUTES.LANDING} color="inherit">Landing</Button>
          <Button component={Link} to={ROUTES.HOME} color="inherit">HOME</Button>
          <Button component={Link} to={ROUTES.ACCOUNT} color="inherit">Account</Button>
          {authUser.roles.includes(ROLES.ADMIN) && (
              <Button component={Link} to={ROUTES.ADMIN} color="inherit">Admin</Button>
          )}
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
});


const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
