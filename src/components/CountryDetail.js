import React, { Component, useState, useEffect } from 'react';
import{ makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Typography,
    Divider,
    Container
} from '@material-ui/core';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import MainTable from './MainContent';
import { useParams } from 'react-router-dom';

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
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    span:{
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    }
}))

export default function CountryDetail(props) {
   const classes = useStyles();
   const [data, setData] = useState(props.location.state.data);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   

   return (
       <div className={classes.root}>
           {console.log(props)}
           <Grid container spacing={2}>
               <Grid item xs={12} align="center">
                    <a  href={`https://en.wikipedia.org/wiki/${data.country}`}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2" gutterBottom>
                                {data.country}
                            </Typography>
                        </ThemeProvider>
                    </a>
               </Grid>
               <Grid item xs={12} md={6} >
                    <CustomPaper 
                        data={data}
                        cases="ACTIVE CASES"
                        upperTitle="Currently Infected Patients"
                        leftTitle="in Mild Condition"
                        rightTitle="Serious or Critical"
                    />
               </Grid>
               <Grid item xs={12} md={6} >
                    <CustomPaper 
                        data={data}
                        cases="CLOSED CASES"
                        upperTitle="Cases which had an outcome:"
                        leftTitle="Recovered / Discharged"
                        rightTitle="Deaths"
                    />
               </Grid>
           </Grid>
           <Grid container className={classes.span}>
               <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="h6">
                        {`Corona Status of ${data.country}`}
                    </Typography>
               </Grid>
           </Grid>

           <MainTable 
                dataList = {[data]} 
                paginationActive="false" 
                sortLabel="hide"
                searchHidden="true"
            />
       </div>
   );

}

function CustomPaper(props) {
    const [data, setData] = useState(props.data);
    
    const classes = useStyles();
    const isEmpty = (text) => {
        return (text === 'undefined' || text === '' || text === 'N/A');
    }
    const dataAvaiableForActive = () => {
        if(isEmpty(data['active cases']) || isEmpty(data['serious/ critical']))return false;
        return true;
    }
    const dataAvaiableForClosed = () => {
        if(isEmpty(data['total recovered']) || isEmpty(data['total deaths']))return false;
        return true;
    }
    const willRender = () => {
        if((props.cases === 'ACTIVE CASES' && dataAvaiableForActive()) ||
            (props.cases === 'CLOSED CASES' && dataAvaiableForClosed())) return true;
        return false;
    }

    return(
        <React.Fragment>
            <Paper className={classes.paper} style={{backgroundColor:'#9ab8e6'}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h6" gutterBottom>
                        {props.cases}
                    </Typography>
                </ThemeProvider>
            </Paper>
            <Paper className={classes.paper} style={{backgroundColor: '#e9ebf0'}}>
                <React.Fragment>
                    {willRender()? (
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <React.Fragment>
                                {
                                    props.cases === 'ACTIVE CASES'? (
                                        <React.Fragment>
                                            {textFormat(data['active cases'])}
                                            {textFormat(props.upperTitle)}
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {textFormat(data['total deaths'] + data['total recovered'])}
                                            {textFormat(props.upperTitle)}
                                        </React.Fragment>   
                                    )
                                    
                                }
                                </React.Fragment>
                            </Grid>
                            <Grid container item xs={12}>
                                {showLowerPart(data, props)}
                            </Grid>
                        </Grid>
                        ) : (
                            <React.Fragment>
                                {textFormat('Data is not available')}
                            </React.Fragment>
                    )}
                </React.Fragment>
            </Paper>
        </React.Fragment>
    );
}

function textFormat(text, extra=null) {
    return (
        <ThemeProvider theme={theme}>
            {
                typeof text === 'number'? (
                    <Typography variant="h6">
                        {text.toLocaleString('en-US')}
                        <React.Fragment>
                        {
                            extra !== null? (
                                `(${extra}%)`
                            ) : (
                                ''
                            )
                        }
                        </React.Fragment>
                    </Typography>
                ) : (
                    <Typography>
                        {text.toLocaleString('en-US')}
                    </Typography>
                )
            }
        </ThemeProvider>
    );
}

function showLowerPart(data, props, isLeft = true) {
    let peopleInLeftPart = null;
    let leftPercentage = null;
    let peopleInRightPart = null;

    if (props.cases === 'ACTIVE CASES') {
        peopleInLeftPart = data['active cases'] - data['serious/ critical'];
        leftPercentage = (peopleInLeftPart / data['active cases']) * 100;
        leftPercentage = Math.floor(leftPercentage);
        peopleInRightPart = data['serious/ critical'];
    } else {
        peopleInLeftPart = data['total recovered'];
        peopleInRightPart = data['total deaths'];
        leftPercentage = (peopleInLeftPart / (peopleInLeftPart + peopleInRightPart)) * 100;
        leftPercentage = Math.floor(leftPercentage);
    }

    return (
        <React.Fragment>
            <Grid item xs={6} align="center">
                <React.Fragment>
                    {textFormat(peopleInLeftPart, leftPercentage)}
                    {textFormat(props.leftTitle)}
                </React.Fragment>
            </Grid>
            <Grid item xs={6} align = "center">
                <React.Fragment>
                    {textFormat(peopleInRightPart, 100-leftPercentage)}
                    {textFormat(props.rightTitle)}
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );

}