import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import NavBar from './components/NavBar';
import CountryDetail from './components/CountryDetail';
import { StateProvider } from './store.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


ReactDOM.render(
        <StateProvider>
            <React.Fragment>
                <Router>
                    <NavBar/>
                    {/*<App url="http://127.0.0.1:8000/api/v1/corona_stats/"/>*/}
                    <Switch>
                        <Route path="/" component={App} exact/>
                        <Route path="/country/:cName/" component={CountryDetail}/>
                    </Switch>
                </Router>
            </React.Fragment>
        </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
