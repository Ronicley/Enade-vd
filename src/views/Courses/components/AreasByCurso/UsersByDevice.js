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
import CousersService from '../../../../service/CousersService';
import { CircularIndeterminate } from '../../../../components/Loading';


const useStyles = makeStyles(() => ({
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
        display: 'flex',
        flex: 1
    },
    footer: {
        padding:'1%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    }
}));


const AreasByCourse = props => {
    const { className, ...rest } = props;
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    async function loadingData() {
        setLoading(true);
        let response;

        try {
            response = await CousersService.CoursersService();

            console.log(response.data);

            let word = [];

            response.data.forEach(
                (i) => {
                    i[Object.keys(i)].forEach(
                        (j) => {
                            word.push([`Computação ${Object.keys(i)} ${j}`]);
                        }
                    );

                }
            );

            console.log(word);

            setData(word);

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
            className={className}
        >
            <CardHeader
                title="Areas de avaliação por curso"
            />
            <Divider/>
            <CardContent className={classes.content}>

                {
                    loading ? (
                        <div className={classes.center}>
                            <CircularIndeterminate/>
                        </div>
                    ) : (
                        <div className={classes.center}>
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="WordTree"
                                loader={<div>Loading Chart</div>}
                                data={data}
                                options={{

                                    wordtree: {
                                        format: 'suplid',
                                        word: 'Computação'
                                    }
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    )
                }

            </CardContent>
            <Divider/>
            <div className={classes.footer}>
                CC = Ciência da Computação, SS = Sistemas de Inforamção e ENG = Engenharia de Software
            </div>
        </Card>
    );
};

AreasByCourse.propTypes = {
    className: PropTypes.string
};

export default AreasByCourse;
