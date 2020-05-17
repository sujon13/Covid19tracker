 import React, { Component, useState, useEffect } from 'react';
 import{ makeStyles } from '@material-ui/core/styles';
 import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
 import {
     Paper,
     Grid
 } from '@material-ui/core';
 import HeadPaper from './components/HeadNews';
 import MainTable from './components/MainContent';
 import axios from 'axios';

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
 }))

 export default function App() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    //const [url, setUrl] = useStyles(props.url)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
     
            try {
                let url = "https://a1caa880.ngrok.io/api/v1/corona_stats/";
                let URL = "http://127.0.0.1:8000/api/v1/corona_stats/"
                const result = await axios(URL);
                setData(result.data);
            } catch (error) {
                console.log(error);
                setIsError(true);
            }
            setIsLoading(false);
        };
     
        fetchData();
      }, []);

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </React.Fragment>
        );    
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
                    <Grid item xs={12}>
                        <MainTable dataList={data} paginationActive="true"/>
                    </Grid>
                </Grid>
            )}
        </div>
    );

 }