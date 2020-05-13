/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RegionsService from '../../../../service/RegionsService';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: '100%'
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

const ListRegions = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    let r;
    RegionsService.regionsService()
      .then(async snapshot => {
        r = await snapshot.data;
          setRegions(r);
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
              <MaterialTable
                  title="Regiões"
                  columns={[
                      { title: 'id', field: 'id' },
                      { title: 'Região', field: 'regiao' }
                  ]}
                  data={regions}
                  localization={{
                      body: {
                          emptyDataSourceMessage: 'Nenhum dado encontrado'
                      },
                      toolbar: {
                          searchPlaceholder: 'Buscar',
                          searchTooltip: 'Pesquisar'
                      },
                      pagination: {
                          labelRowsSelect: 'Linhas',
                          labelDisplayedRows: ' {from}-{to} página {count}',
                          firstTooltip: 'Primeira página',
                          previousTooltip: 'Página anterior',
                          nextTooltip: 'Próxima página',
                          lastTooltip: 'Última página'
                      }
                  }}
              />
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

ListRegions.propTypes = {
  className: PropTypes.string
};

export default ListRegions;
