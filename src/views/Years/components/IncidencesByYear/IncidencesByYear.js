import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider
} from '@material-ui/core';

import Chart from 'react-google-charts';
import YearsService from '../../../../service/YearsService';
import { CircularIndeterminate } from '../../../../components/Loading';


const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    chartContainer: {
        position: 'relative',
        height: '100%'
    },
    content: {
        height: '100%',
        width: '100%',
        padding: 0
    },
    image: {
        height: 48,
        width: 48
    },
    actions: {
        justifyContent: 'flex-end'
    },
    center: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: '100%'
    },
    labelLateral: {
        fontFamily: 'Roboto',
        fontSize: '12px',
        left: 0,
        marginLeft: '1em',
        transform: 'rotate(270deg)',
        position: 'absolute'
    },
    char: {
        marginLeft: '1.8em'
    }
}));


const IncidencesByYear = props => {
    const { className, ...rest } = props;
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const classes = useStyles();


    async function loadingData() {
        setLoading(true);
        let dataYears;
        try {
            dataYears = await YearsService.getVolumeIncByYear();

            setData([
                ['Anos', 'Volume de Incidências '],
                ['2008', dataYears.data.ano2008],
                ['2011', dataYears.data.ano2011],
                ['2014', dataYears.data.ano2014]
            ]);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadingData();
    }, []);

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title="Resultados para os cursos de Ciência da Computação, Sistemas de Informação e Engenharia de Software"
            />
            <Divider/>
            <CardContent className={classes.content}>
                <div className={classes.chartContainer}>
                    {loading ? (
                        <div className={classes.center}>
                            <CircularIndeterminate/>
                        </div>
                    ) : (
                        <div className={classes.center}>
                            <span className={classes.labelLateral}>% de erros</span>
                            <Chart
                                chartType="AreaChart"
                                data={data}
                                height={'100%'}
                                className={classes.char}
                                options={{
                                    title:'Quantidade de alunos por ano',
                                    hAxis: { title: 'Anos', titleTextStyle: { color: '#333' } },
                                    vAxis: { minValue: 0 }
                                }}
                                rootProps={{ 'data-testid': '2' }}
                                // For tests
                                width={'95%'}
                            />
                        </div>

                    )}
                </div>
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
                {/*<Button*/}
                {/*  color="primary"*/}
                {/*  size="small"*/}
                {/*  variant="text"*/}
                {/*>*/}
                {/*  View all <ArrowRightIcon />*/}
                {/*</Button>*/}
            </CardActions>
        </Card>
    );
};

IncidencesByYear.propTypes = {
    className: PropTypes.string
};

export default IncidencesByYear;
