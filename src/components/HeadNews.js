import React, { Component,useState, useEffect } from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    Grid,
    Tooltip
 } from '@material-ui/core';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: theme.palette.text.primary,
        //height: 100,
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
        },
        
    }
}))

export default function HeadPaper(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={5}>
            <ThemeProvider theme={theme}>
                <Typography variant="h4" gutterBottom>
                    Covid-19 Update
                </Typography>
            </ThemeProvider>
            <Table data={props.data}/>
        </Paper>

    );
}


function Table(props) {
    const classes = useStyles();
    const [dataList, setDataList] = useState(props.data);

    function filterData() {
        const tempData = [];
        for(const data of dataList) {
            if(data.country.toLowerCase() == 'bangladesh' || data.country.toLowerCase() == 'world')tempData.push(data);   
        }
        return tempData;
    }


    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
   
    function formatInfo(object, str) {
        return `${capitalize(str)}: ${object[str].toLocaleString('en-US')}`;
    }
    function printCase(object, str) {
        return (
            <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                    <Typography>
                        {formatInfo(object, str)}
                    </Typography>
                </ThemeProvider>
            </Grid>
        )
    }
    
    return (
        <Grid container spacing={5}>
            <React.Fragment>
                {
                    filterData().map((data) => (
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined">
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Tooltip title="see details" placement="top">
                                            <Link to={{
                                                pathname: `/country/${data.country}/`,
                                                state: {
                                                    data: data
                                                }
                                            }}>
                                                <ThemeProvider theme={theme}>
                                                    <Typography variant="h6" gutterBottom>
                                                        {capitalize(data.country)}
                                                    </Typography>
                                                </ThemeProvider>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    {printCase(data, "total cases")}
                                    {printCase(data, "total deaths")}
                                    {printCase(data, "total recovered")}
                                </Grid>
                            </Paper>
                        </Grid>    
                    ))
                }
            </React.Fragment>
        </Grid>
    );
}