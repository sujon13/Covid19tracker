import React, { Component } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Avatar,
    Tooltip,
} from '@material-ui/core';
import  MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}> 
                        Corona Tracker
                    </Typography>
                    <Tooltip title="Github Repository">
                        <a target="_blank" href={`https://github.com/sujon13/Covid19tracker`}>
                            <IconButton>
                                <GitHubIcon style={{color:'white'}}/>
                            </IconButton>
                        </a>
                    </Tooltip>
                    <Tooltip title="Developer linkedin profile">
                        <a target="_blank" href={`https://www.linkedin.com/in/arifur-rahman-sujon/`}>
                            <IconButton>
                                <LinkedInIcon style={{color:'white'}}/>
                            </IconButton>
                        </a>
                    </Tooltip>
                </Toolbar>
            </AppBar>

        </div>
    )
}