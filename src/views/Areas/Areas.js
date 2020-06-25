/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    QuestionsByArea,
    ListAreas
} from './components';

const useStyles = makeStyles(
    theme => (
        {
            root: {
                padding: theme.spacing(4)
            }
        }
    )
);

const Areas = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >

                <Grid
                    item
                    lg={7}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <QuestionsByArea/>
                </Grid>

                <Grid
                    item
                    lg={5}
                    md={6}
                    xl={9}
                    xs={12}
                >
                    <ListAreas/>
                </Grid>

            </Grid>
        </div>
    );
};

export default Areas;
