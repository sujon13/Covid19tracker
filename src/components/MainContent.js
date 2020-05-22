import React, { useState,useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
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
    IconButton,
    Button,
    Grid,
    Tooltip,
    Typography,
    InputBase,
    TextField,
    Box,
} from '@material-ui/core';

import { isCompositeComponentWithType } from "react-dom/test-utils";
import SearchIcon from '@material-ui/icons/Search';
import { lightBlue } from "@material-ui/core/colors";

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
        bgColor: "#0d7303",
        color: "white",
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
        marginTop: 10,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
        },
    },
    container: {
        maxHeight: 800,
    },
    tableName: {
        textAlign: 'center',
        justify: "center",
    },
}))

export default function MainTable(props) {
    const classes = useStyles();
    const [dataList, setDataList] = useState(props.dataList);
    const [filteredDataList, setFilteredDataList] = useState(props.dataList);
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

    const handleSearch = (value) => {
        const tempFilteredDataList = filterDataListForValue(value);
        console.log(value);
        console.log(tempFilteredDataList);
        setFilteredDataList(tempFilteredDataList);   
    }
    function filterDataListForValue(value) {
        if(value === '')return dataList;
        let newDataList = [];
        for(const data of dataList) {
            const entryStr = data.country.toString().toLowerCase();
            if(entryStr.includes(value)) {
                newDataList.push(data);
            }
        }
        return newDataList;
    }
    // It will remove continent info and invalid info
    function filterDataList() {
        const tempData = [];
        for(const data of filteredDataList) {
            if(!continent.includes(data.country.toLowerCase()) && isNotEmpty(data.country))tempData.push(data);   
        }
        
        return tempData;
    }
    const world = () => {
        return dataList.find((data) => data.country.toLowerCase() == 'world');
    }

    return (
        <Paper className={classes.root} elevation={3}>
            <SearchBar
                onSearchValueChanged = {handleSearch}
                searchHidden = {props.searchHidden}
            />
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.id}
                                align="center"
                                sortDirection={orderBy === column.id ? order : false}
                                style={{fontWeight:"bold"}}
                            >
                                <React.Fragment>
                                    {props.sortLabel === 'hide'? (
                                        `${column.label}`
                                    ) : (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={createSortHandler(column.id)}
                                            >
                                            {column.label}
                                            
                                        </TableSortLabel>
                                    )}
                                </React.Fragment>
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
                                                        style={{backgroundColor: column.bgColor, color: column.color, fontWeight: "bold"}}
                                                    >
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                ) : (
                                                    <React.Fragment>
                                                        {column.id === 'country'? (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{fontWeight: "bold"}}
                                                            >
                                                                <Tooltip title="see details">
                                                                    <Link to={{
                                                                        pathname: `/country/${value}/`,
                                                                        state: {
                                                                            data: data
                                                                        }
                                                                    }}>{value}</Link>
                                                                </Tooltip>
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {value}
                                                            </TableCell>
                                                        )}
                                                    </React.Fragment>
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
            <Typography variant="caption">
                <span>
                    {`data source: `}
                    <a  href={'https://www.worldometers.info/coronavirus/'}>
                        {'https://www.worldometers.info'}
                    </a>
                </span>
            </Typography>
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
                                    style={{backgroundColor: "#d8e0ed", fontWeight: "bold"}}
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

const SearchBar = (props) => {
    const classes = useStyles();

    const handleSearch = (event) => {
        const value = event.target.value;
        props.onSearchValueChanged(value.toLowerCase());
    }
    return (
        <React.Fragment>
            {props.searchHidden === 'false'? (
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.tableName}>
                            <Typography variant="h6">
                                Covid-19 Statistics
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            placeholder="Search country name.."
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="outlined"
                            onChange={handleSearch}
                        />   
                    </Grid>
                </Grid>
            ) : (
                ''
            )}
        </React.Fragment>
    );
}