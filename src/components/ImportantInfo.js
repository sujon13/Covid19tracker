import React, { Component, useState, useEffect, useContext } from 'react';
import{ makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Link,
    Tooltip,

} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
    },
   
    paper: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
       [theme.breakpoints.up('sm')]: {
           marginLeft: theme.spacing(5),
       },
    },
}))


const dataList = [
    {
        'number': '333',
        'institute': 'National call center',
        'link': 'http://333.gov.bd/333website/',
    },
    {
        'number': '16263',
        'institute': 'Shastho Batayon',
        'link': 'http://16263.dghs.gov.bd/',
    },
    {
        'number': '10655',
        'institute': 'IEDCR',
        'link': 'https://www.iedcr.gov.bd/website/',
    },
    {
        'number': '09611677777',
        'institute': 'Expert Health Line',
        'link': 'https://bsmmu.edu.bd/',
    },
    {
        'number': '109',
        'institute': 'National Help Line',
        'link': 'http://nhc.gov.bd/',
    },
    {
        'number': '999',
        'institute': 'National Emergency Service',
        'link': 'https://www.999.gov.bd/',
    },
]

export default function ImportantInfo() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2} direction='row'>
                <React.Fragment>
                    {dataList.map((data) => {
                        return (
                            <Grid container item xs={12} md={2}>
                                <Grid item xs={12} style={{fontWeight: 'bold'}}>
                                    {data.number}
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip title='go website'>
                                        <a 
                                            href={data.link}
                                            target="_blank"
                                            style={{textDecoration: 'none'}}

                                        >
                                            {data.institute}
                                            
                                        </a>
                                    </Tooltip>
                                </Grid>
                                
                            </Grid>
                        );
                    })}
                </React.Fragment>
            </Grid>
        </Paper>
    );
}