/* eslint-disable linebreak-style */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  title:{
    color: 'white',
    fontSize:'24px',
    fontFamily: 'Trebuchet MS, Verdana,sans-serif',
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();


  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>

        <RouterLink to="/">
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.png"
            width="150"
          /> */}
          <Typography 
            className={classes.title}
          >
            Enade - VD
          </Typography>
        </RouterLink>


        <div className={classes.flexGrow} />

        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
