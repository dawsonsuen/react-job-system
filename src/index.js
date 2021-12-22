import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import {
	HashRouter as Router,
} from 'react-router-dom';
import './styles';
import App from './App';
axios.defaults.baseURL = 'http://localhost:5000/api';

ReactDOM.render(

    <Router>
		<App/>
	</Router>,

	document.getElementById('root'),
);
