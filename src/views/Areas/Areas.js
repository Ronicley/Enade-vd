/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TasksProgress,
  LatestSales
} from './components';

const useStyles = makeStyles(
  theme => (
    {
      root: {
        padding: theme.spacing(4)
      }
    }
  )
);

const Areas = () => {
  const classes = useStyles();
  const [dataAreas, setDataAreas] = useState({});
  

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >

        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <Budget />
        </Grid>

        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>

        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>

      </Grid>
    </div>
  );
};

export default Areas;
