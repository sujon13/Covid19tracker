import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    footer: {
        textAlign: 'center',
        padding: theme.spacing(3, 2),
        marginBottom: 0,
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));
  
export default function StickyFooter() {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1"></Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        Arifur Rahman Sujon
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }