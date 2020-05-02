import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider, CardActions } from '@material-ui/core';
import { CircularIndeterminate } from '../../../../components/Loading';
import RegionsService from '../../../../service/RegionsService';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    chartContainer: {
        position: 'relative',
        height: '300px'
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
    },
    textField: {
        flex: 1,
        float: 'left'
    }
}));

const ErrosByRegion = props => {
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState([]);
        const [year, setYear] = useState('1');
        const [field, setField] = useState('Dados dos anos de 2008, 2011, 2014');

        const handleChange = (event) => {
            let year = event.target.value;
            year==="1"? (
                setField(`Dados para os anos de 2008, 2011 e 2014`)
            ):(
                setField(`Dados para o ano de ${year}`)
            );

            setYear(year);
        };

        const years = [
            {
                value: '1',
                label: 'Todos'
            },
            {
                value: '2008',
                label: '2008'
            },
            {
                value: '2011',
                label: '2011'
            },
            {
                value: '2014',
                label: '2014'
            }
        ];

        async function loadingData(year) {
            setLoading(true);
            try {
                const data = await RegionsService.getErrosByRegion(year);

                let d = [];
                d.push(['Regiões', 'Ciência da Computação', 'Sistemas de informação', 'Engenharia de Software']);

                data.data.forEach((item) => {
                    d.push([
                        item.regiao,
                        item.cc,
                        item.ss,
                        item.eng
                    ]);

                });
                setData(d);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }


        useEffect(() => {
            loadingData(year);
            setLoading(false);
        }, [year]);

        const { className, ...rest } = props;

        const classes = useStyles();

        return (
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardHeader title="Curso com mais erros por região"/>
                <CardActions>
                    <TextField
                        id="standard-select-currency"
                        select
                        className={classes.textField}
                        label="Anos"
                        value={year}
                        onChange={handleChange}
                    >
                        {years.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </CardActions>
                <Divider/>
                <CardContent>
                    <div className={classes.chartContainer}>
                        {loading ? (
                            <div className={classes.center}>
                                <CircularIndeterminate/>
                            </div>
                        ) : (
                            <div className={classes.center}>
                                <span className={classes.percentErrors}>% de erros</span>
                                <Chart
                                    chartType="Bar"
                                    className={classes.char}
                                    data={data}
                                    height={'100%'}
                                    // For tests
                                    options={{
                                        chart: {
                                            title: field
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
    }
;

ErrosByRegion.propTypes = {
    className: PropTypes.string
};

export default ErrosByRegion;
