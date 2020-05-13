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
        height: '700px'
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
    },
    textField: {
        flex: 1,
        float: 'left'
    }
}));

const HitsByRegion = props => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [year, setYear] = useState('1');
    const [field, setField] = useState('Dados dos anos de 2008, 2011, 2014');

    const handleChange = (event) => {
        let year = event.target.value;
        year === '1' ? (
            setField(`Dados para os anos de 2008, 2011 e 2014`)
        ) : (
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
            const { data } = await RegionsService.getStudentsByYear(year);
            let d = [];

            d.push(
                ['Estado', 'N° estudantes'],
                ['BR-RO', data[0].norte],
                ['BR-AP', data[0].norte],
                ['BR-RR', data[0].norte],
                ['BR-AM', data[0].norte],
                ['BR-AC', data[0].norte],
                ['BR-PA', data[0].norte],
                ['BR-RO', data[0].norte],
                ['BR-TO', data[0].norte],
                ['BR-AL', data[1].nordeste],
                ['BR-BA', data[1].nordeste],
                ['BR-CE', data[1].nordeste],
                ['BR-MA', data[1].nordeste],
                ['BR-PB', data[1].nordeste],
                ['BR-PE', data[1].nordeste],
                ['BR-PI', data[1].nordeste],
                ['BR-RN', data[1].nordeste],
                ['BR-SE', data[1].nordeste],
                ['BR-DF', data[2].centrooeste],
                ['BR-GO', data[2].centrooeste],
                ['BR-MT', data[2].centrooeste],
                ['BR-MS', data[2].centrooeste],
                ['BR-ES', data[3].sudeste],
                ['BR-MG', data[3].sudeste],
                ['BR-RJ', data[3].sudeste],
                ['BR-SP', data[3].sudeste],
                ['BR-PR', data[4].sul],
                ['BR-RS', data[4].sul],
                ['BR-SC', data[4].sul]
            );

            setData(d);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadingData(year);

    }, [year]);

    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader title="Volume de estudantes por ano e região"/>
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
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="GeoChart"
                                className={classes.char}
                                data={data}
                                options={{
                                    resolution: 'provinces',
                                    region: 'BR',
                                    colorAxis: { colors: ['white', 'red'] }
                                }}
                                mapsApiKey="YOUR_KEY_HERE"
                                rootProps={{ 'data-testid': '1' }}
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
