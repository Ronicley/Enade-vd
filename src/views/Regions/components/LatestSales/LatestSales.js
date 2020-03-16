/* eslint-disable linebreak-style */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const LatestSales = props => {
  const {
    className,
    ...rest
  } = props;

  const classes = useStyles();


  return (
    <Card
      {
      ...rest
      }

      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Latest Sales"
      />
      <Divider />

      <CardContent>
        <div className={classes.chartContainer}>
          {/* <Bar
            data={data}
            options={options}
          /> */}
          <Chart
            chartType="BarChart"
            data={data}
            height="100%"
            width="100%"
          />

        </div>
      </CardContent>

      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
