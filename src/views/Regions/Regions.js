/* eslint-disable linebreak-style */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  ErrosByRegion,
  LatestSales
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Regions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >

        <Grid
          item
          lg={12}
          md={8}
          xl={9}
          xs={12}          
        >
          <ErrosByRegion />
        </Grid>
        <Grid
          item
          lg={5}
          md={6}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Regions;
