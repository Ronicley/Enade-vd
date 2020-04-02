import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import { CircularIndeterminate } from '../../../../components/Loading';
import RegionsService from '../../../../service/RegionsService';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  },
  center: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '100%'
  },
  percentErrors: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    left: 0,
    marginLeft: 0,
    transform: 'rotate(270deg)',
    position: 'absolute'
  },
  char: {
    marginLeft: '1.5em'
  }
}));

const HitsByRegion = props => {
  const [loading, setLoading] = useState(false);
  const [obj, setObj] = useState();

    
  async function loadingData(r, c) {
    let totalQuest = 0;
    let qtd = 0;    

    try {
      const { data } = await RegionsService.getHitsByRegion(r, c);

      data.forEach(element => {
        qtd = element.qtd_certas + qtd;
        totalQuest = element.qtd_questoes + totalQuest;
      });
      

      return (qtd / totalQuest) * 100;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);

    let obj = {
      ciencia: [],
      sistemas: [],
      engenharia: []
    };

    // 1	Norte
    // 2	Nordeste
    // 3	Centro-Oeste
    // 4	Sudeste
    // 5	Sul

    // 1 "Ciência da Computação"
    // 2 "Sistemas de Informação"
    // 3 "Engenharia da Computação"

    //getErrosByRegion(região, curso);
    (async () => {
      await loadingData(1, 1).then(snapshot => {
        obj.ciencia.push(snapshot);
      });

      await loadingData(1, 2).then(snapshot => {
        obj.sistemas.push(snapshot);
      });

      await loadingData(1, 3).then(snapshot => {
        obj.engenharia.push(snapshot);
      });

      await loadingData(2, 1).then(snapshot => {
        obj.ciencia.push(snapshot);
      });

      await loadingData(2, 2).then(snapshot => {
        obj.sistemas.push(snapshot);
      });

      await loadingData(2, 3).then(snapshot => {
        obj.engenharia.push(snapshot);
      });

      await loadingData(3, 1).then(snapshot => {
        obj.ciencia.push(snapshot);
      });

      await loadingData(3, 2).then(snapshot => {
        obj.sistemas.push(snapshot);
      });

      await loadingData(3, 3).then(snapshot => {
        obj.engenharia.push(snapshot);
      });

      await loadingData(4, 1).then(snapshot => {
        obj.ciencia.push(snapshot);
      });

      await loadingData(4, 2).then(snapshot => {
        obj.sistemas.push(snapshot);
      });

      await loadingData(4, 3).then(snapshot => {
        obj.engenharia.push(snapshot);
      });

      await loadingData(5, 1).then(snapshot => {
        obj.ciencia.push(snapshot);
      });

      await loadingData(5, 2).then(snapshot => {
        obj.sistemas.push(snapshot);
      });

      await loadingData(5, 3).then(snapshot => {
        obj.engenharia.push(snapshot);
      });

      // setTimeout(() => {
      setObj(obj);
      setLoading(false);
      // }, 10000);
    })();
  }, []);

  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Curso com mais acertos por região" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          {loading ? (
            <div className={classes.center}>
              <CircularIndeterminate />
            </div>
          ) : (
            <div className={classes.center}>
              <span className={classes.percentErrors}>% de acertos</span>
              <Chart
                chartType="Bar"
                className={classes.char}
                data={[
                  [
                    'Regiões',
                    'Ciencia da Computação',
                    'Sistemas de informação',
                    'Engenharia de Software'
                  ],
                  [
                    'Norte',
                    obj?.ciencia[0],
                    obj?.sistemas[0],
                    obj?.engenharia[0]
                  ],
                  [
                    'Nordeste',
                    obj?.ciencia[1],
                    obj?.sistemas[1],
                    obj?.engenharia[1]
                  ],
                  [
                    'Centro Oeste',
                    obj?.ciencia[2],
                    obj?.sistemas[2],
                    obj?.engenharia[2]
                  ],
                  [
                    'Sudeste',
                    obj?.ciencia[3],
                    obj?.sistemas[3],
                    obj?.engenharia[3]
                  ],
                  ['Sul', obj?.ciencia[4], obj?.sistemas[4], obj?.engenharia[4]]
                ]}
                height={'100%'}
                // For tests
                options={{
                  chart: {
                    title: 'Dados dos anos de 2008, 2011 e 2014'
                  }
                }}
                rootProps={{ 'data-testid': '2' }}
                width={'95%'}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

HitsByRegion.propTypes = {
  className: PropTypes.string
};

export default HitsByRegion;
