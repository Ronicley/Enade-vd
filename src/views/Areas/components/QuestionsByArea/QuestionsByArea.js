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
import AreasService from '../../../../service/AreasService';
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
    char: {
        marginLeft: '1.8em'
    }
}));


const QuestionsByArea = props => {
    const { className, ...rest } = props;
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    async function loadingData() {
        setLoading(true);
        let response, list;
        try {
            response = await AreasService.NumberOfQuestionByArea();

            list = [
                ['Area', 'Quantidade de questões'],
                ['Engenharia de Software', response.data[0].qtd_questoes],
                ['Bancos de Dados', response.data[1].qtd_questoes],
                ['Lógica', response.data[2].qtd_questoes],
                ['Tópicos Avançados de Engenharia', response.data[3].qtd_questoes],
                ['Arquitetura de Computadores', response.data[4].qtd_questoes],
                ['Estruturas de Dados', response.data[5].qtd_questoes],
                ['Sistemas Operacionais', response.data[6].qtd_questoes],
                ['Teorias da Computação', response.data[7].qtd_questoes],
                ['Sistemas de Informação', response.data[8].qtd_questoes],
                ['Redes de Computadores', response.data[9].qtd_questoes],
                ['Inteligência Artificial', response.data[10].qtd_questoes],
                ['Computação Gráfica', response.data[11].qtd_questoes]
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
                title="Volume de incidencias por ano"
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
                            <Chart
                                width={'700px'}
                                height={'700px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={data}
                                options={{
                                    title: 'Quantidade de questões por área'
                                }}
                                rootProps={{ 'data-testid': '1' }}
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

QuestionsByArea.propTypes = {
    className: PropTypes.string
};

export default QuestionsByArea;
