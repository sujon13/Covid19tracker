 import React, { Component, useState, useEffect, useContext } from 'react';
 import{ makeStyles } from '@material-ui/core/styles';
 import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
 import {
     Paper,
     Grid,
     Button,
     Typography,
     Tooltip
 } from '@material-ui/core';
 import HeadPaper from './components/HeadNews';
 import MainTable from './components/MainContent';
 import axios from 'axios';
 import { store } from './store.js';

 const useStyles = makeStyles((theme) => ({
     root: {
         flexGrow: 1,
         marginTop: theme.spacing(5),
     },
    
     paper: {
         padding: theme.spacing(2),
         textAlign: 'center',
         color: theme.palette.text.secondary,
     },
     button: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
        },
     },
 }))

 export default function App(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [demo, setDemo] = useState(0);
    const [buttonName, setButtonName] = useState('today');
    const globalState = useContext(store);
    const [data, setData] = useState(globalState.state.data);
    const { dispatch } = globalState;

    const fetchData = async (day) => {
        setIsError(false);
        setIsLoading(true);
        try {
            let url = "https://a1caa880.ngrok.io/api/v1/corona_stats/";
            let URL = `http://127.0.0.1:8000/api/v1/corona_stats/${day}/`
            const result = await axios(URL);
            
            setData(result.data);
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
        
    };
    useEffect(() => {
        if(globalState.state.data.length === 0) {
            fetchData('today');
        }

    }, []);

    useEffect(() => {
        if(data.length !== 0) {
            console.log(data);
            dispatch({ type: 'assign', item: data });
        }
    }, [data]);
    
    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </React.Fragment>
        );    
    }
    const handleButtonClick = (name) => {
        setButtonName(name);
        fetchData(name);
    }

    return (
        <div className={classes.root}>
            {isError && <div>Something went wrong ...</div>}
            { isLoading ? (
                <div>Loading ...</div>
            ) : (
                <Grid container spacing={3}>
                    <Grid container item sm={12} md={3}spacing={3} direction="row">
                        <FormRow/>
                    </Grid>
                    <Grid item sm={12} md={9}>
                        <HeadPaper data={data}/>
                    </Grid>
                    <Grid container item xs={12} direction="row">
                        <Grid item xs={6} >
                            <SelectorButton onButtonClick={handleButtonClick} buttonName={buttonName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <MainTable dataList={data} paginationActive="true"/>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );

 }

 const SelectorButton = (props) => {
    const classes = useStyles();

    const [colors, setColors] = useState({
        today: 'primary',
        yesterday: 'default'
    });

    const handleClick = (name) => {
        console.log(name);
        console.log(props.buttonName);
        if(name !== props.buttonName) {
            props.onButtonClick(name);
        }
    }
    
    useEffect(() => {
        if(props.buttonName === 'yesterday') {
            setColors({
                today: 'default',
                yesterday:'primary'
            });
        }
    }, []);

    return (
        <Grid container spacing={1} className={classes.button}>
            <Grid item>
                <Tooltip title="click to see todays data">
                    <Button
                        variant="contained"
                        color={colors.today}
                        onClick={() => handleClick('today')}
                        style={{textTransform: "none"}}
                    >
                    Today
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="click to see yesterdays data">
                    <Button 
                        variant="contained"
                        color={colors.yesterday}
                        onClick={() => handleClick('yesterday')}
                        style={{textTransform: "none"}}
                    >
                        Yesterday
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    );
}