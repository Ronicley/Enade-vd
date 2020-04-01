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
import AreasService from '../../../../service/AreasService';
import { ProgressBar } from '../../../../components/Loading';



const useStyles = makeStyles(
  theme => (
    {
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
    }
  )
);

const LatestSales = props => {
  const {
    className,
    ...rest
  } = props;
  const classes = useStyles();
  const [areas, setAreas] = useState([])

  useEffect(() => {
    let r;
    AreasService.AreasService().then(
      async (snapshot) => {
        r = await snapshot.data
        setAreas(r)
      }
    ).catch(error => {
      console.error(error)
    });

  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Áreas"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>

              <TableHead>

                <TableRow>

                  <TableCell >
                    Área Id
                  </TableCell>

                  <TableCell>
                    Área nome
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {
                  areas.length !== 0 ? (
                    areas.map(
                      area => (
                        <TableRow
                          hover
                          key={
                            area.id
                          }
                        >
                          <TableCell>
                            {
                              area.id
                            }
                          </TableCell>
                          <TableCell>
                            {
                              area.area
                            }
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    
                    <ProgressBar />
                    
                  ) 

                }
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
