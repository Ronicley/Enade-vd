/* eslint-disable linebreak-style */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
    ErrosByRegion,
    ListRegions,
    HitsByRegion,
    StudentsByAno,
    NullsByRegion
} from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Regions = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >

                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <ErrosByRegion/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <HitsByRegion/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <NullsByRegion/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <ListRegions/>
                </Grid>

                <Grid
                    item
                    lg={12}
                    md={6}
                    xl={12}
                    xs={12}
                >
                    <StudentsByAno/>
                </Grid>

            </Grid>
        </div>
    );
};

export default Regions;
