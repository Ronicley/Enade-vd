/* eslint-disable linebreak-style */
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
    width: '100% !important' 
  },
  barColorPrimary: {
    backgroundColor: '#3f51b5',
    width: '100%' 
  },
   
})(LinearProgress);


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent:'center'
  },
  margin: {
    margin: theme.spacing(1),
    
  },

}));

export default function ProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorLinearProgress className={classes.margin} />
    </div>
  );
}