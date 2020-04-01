/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import { Chart } from 'react-google-charts';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RegionsService from '../../../../service/RegionsService';
import { ProgressBar } from '../../../../components/Loading';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  tableBody: {
    marginTop: 12,
    marginBottom: 12
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [regions, setregions] = useState([]);

  useEffect(() => {
    let r;
    RegionsService.regionsService()
      .then(async snapshot => {
        r = await snapshot.data;
        setregions(r);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Regiões" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Região Id</TableCell>

                  <TableCell>Região nome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {regions.length !== 0 ? (
                  regions.map(region => (
                    <TableRow
                      hover
                      key={region.id}
                    >
                      <TableCell>{region.id}</TableCell>
                      <TableCell>{region.regiao}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>
                      <ProgressBar />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
