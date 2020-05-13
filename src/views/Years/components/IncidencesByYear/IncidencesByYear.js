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
    chartContainer: {
        position: 'relative',
        height: '100%'
    },
    content: {
        width: '100%',
        padding: 0
    },
    center: {
        flex:1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    labelLateral: {
        fontFamily: 'Roboto',
        fontSize: '12px',
        left: 0,
        transform: 'rotate(270deg)',
        position: 'absolute',
        height:'20px'
    },
    char: {
        marginLeft: '2em'
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
            className={ className}
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
                            <span className={classes.labelLateral}>% de Estudantes</span>
                            <Chart
                                chartType="AreaChart"
                                data={data}
                                height={'500px'}
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
