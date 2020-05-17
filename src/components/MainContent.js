import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    TableSortLabel,
    IconButton
} from '@material-ui/core';

import { isCompositeComponentWithType } from "react-dom/test-utils";

const columns = [
    { 
        id: "country",
        label: "Country",
        align:"center"
    },
    {   id: "total cases",
        label: "Total cases",
        align: "right",
        padding: 3,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "new cases",
        label: "New cases",
        align: "right",
        padding: 3,
        bgColor: "#edeb82",
        color: "black",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "total deaths",
        label: "Total deaths",
        align: "right",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "new deaths",
        label: "New deaths",
        align: "right",
        bgColor: "red",
        color: "white",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "total recovered",
        label: "Total recovered",
        align: "right",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "active cases",
        label: "Active cases",
        align: "right",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "serious/ critical",
        label: "Critical cases",
        align: "right",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "test/1M population",
        label: "Test/1M ",
        align: "right",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "total tests",
        label: "Total tests",
        align: "right",
        format: (value) => value.toLocaleString('en-US'),
    },
  
];
const continent = [
    "asia",
    "europe",
    "africa",
    "north america",
    "south america",
    "oceania",
    'world'
]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
         return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
        },
    },
    container: {
        maxHeight: 800
    }
}))

export default function MainTable(props) {
    const classes = useStyles();
    const [dataList, setDataList] = useState(props.dataList);
    const [paginationActive, setPaginationActive] = useState(props.paginationActive);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('new cases');


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    function isNotEmpty(str) {
        if(!str || str.length == 0)return false;
        else return true;
    }
    function filterDataList() {
        const tempData = [];
        for(const data of dataList) {
            if(!continent.includes(data.country.toLowerCase()) && isNotEmpty(data.country))tempData.push(data);   
        }
        
        return tempData;
    }
    const world = () => {
        return dataList.find((data) => data.country.toLowerCase() == 'world');
    }

    return (
        <Paper className={classes.root} elevation={3}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.id}
                                align="center"
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                    >
                                    {column.label}
                                    
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        <DefaultRow data={world()}/>    
                    {   
                
                        stableSort(filterDataList(), getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(data => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={data.country}>
                                    {columns.map((column) => {
                                        const value = data[column.id];
                                        
                                        return (
                                            <React.Fragment>
                                                {value > 0? (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{backgroundColor: column.bgColor, color: column.color}}
                                                    >
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                ) : (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Link to={{
                                                            pathname: '/country/',
                                                            state: {
                                                                data: data
                                                            }
                                                        }}>{value}</Link>
                                                    
                                                    </TableCell>

                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <React.Fragment>
                { paginationActive === 'true'? (
                    <TablePagination
                        rowsPerPageOptions={[15, 25, 100]}
                        component="div"
                        count={dataList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                ) : (
                    ''
                )}
            </React.Fragment>
        </Paper>
    );
}


const DefaultRow = (props) => {
   const [data, setData] = useState(props.data);
    
    return (
        <TableRow key='world'>
            <React.Fragment>
                { typeof data === 'undefined'? (
                    <div></div>
                ) : (
                    <React.Fragment>
                        {columns.map((column) => {
                            const value = data[column.id];
                            return (
                                
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{backgroundColor: "#d8e0ed"}}
                                >
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                                   
                            );
                        })}
                    </React.Fragment>

                    
                )}
            </React.Fragment>
        </TableRow>
    );
}