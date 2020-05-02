/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable from 'material-table';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider
} from '@material-ui/core';
import AreasService from '../../../../service/AreasService';


const useStyles = makeStyles(
    theme => (
        {
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
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        let r;
        AreasService.AreasService().then(
            async (snapshot) => {
                r = await snapshot.data;
                setAreas(r);
            }
        ).catch(error => {
            console.error(error);
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
            <Divider/>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <MaterialTable
                            title="Área de avaliação"
                            columns={[
                                { title: 'id', field: 'id' },
                                { title: 'Area', field: 'area' }
                            ]}
                            data={areas}
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
            <Divider/>
            <CardActions className={classes.actions}>

            </CardActions>
        </Card>
    );
};

LatestSales.propTypes = {
    className: PropTypes.string
};

export default LatestSales;
