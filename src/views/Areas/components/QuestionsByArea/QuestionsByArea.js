import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Divider
} from '@material-ui/core';

import Chart from 'react-google-charts';
import AreasService from '../../../../service/AreasService';
import { CircularIndeterminate } from '../../../../components/Loading';


const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    chartContainer: {
        position: 'relative',
        height: '100%',
    },
    content: {
        height: '100%',
        width: '100%',
        padding: 0,
    },
    image: {
        height: 48,
        width: 48,
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
        height: '100%',
    },
    percentErrors: {
        fontFamily: 'Roboto',
        fontSize: '12px',
        left: 0,
        marginLeft: 0,
        transform: 'rotate(270deg)',
        position: 'absolute',
    },
    char: {
        marginLeft: '1.5em',
    },
}));


const QuestionsByArea = props => {
    const { className, ...rest } = props;
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    async function loadingData() {
        setLoading(true);
        let response, list;
        let areas = [];
        let questoes = [];
        let l;
        try {
            response = await AreasService.NumberOfQuestionByArea();

            l = response.data.sort((a, b) => {
                return a.qtd_questoes - b.qtd_questoes;
            });

            l.reverse().forEach((element) => {
                areas.push(element.area);
                questoes.push(element.qtd_questoes);
            });

            let el = areas.pop();
            let el1= questoes.pop();

            areas.unshift(el);
            questoes.unshift(el1);

            list = [
                areas,
                questoes
            ];

            setData(list);
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
                title="Quantidade de questões por area de avaliação"
            />
            <CardContent className={classes.content}>
                <div className={classes.chartContainer}>
                    {loading ? (
                        <div className={classes.center}>
                            <CircularIndeterminate/>
                        </div>
                    ) : (
                        <div className={classes.center}>
                            <span className={classes.percentErrors}>N° questões</span>
                            <Chart
                                width={'95%'}
                                height={'550px'}
                                chartType="Bar"
                                data={data}
                                className={classes.char}
                                options={{
                                    // Material design options
                                    chart: {
                                        title: 'Dados dos anos de 2008, 2011 e 2014'
                                    }
                                }}

                                // For tests
                                rootProps={{ 'data-testid': '2' }}
                            />
                        </div>
                    )}
                </div>
            </CardContent>
            <Divider/>
        </Card>
    );
};

QuestionsByArea.propTypes = {
    className: PropTypes.string
};

export default QuestionsByArea;
