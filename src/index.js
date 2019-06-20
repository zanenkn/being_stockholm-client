import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './semantic/dist/semantic.min.css';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

const loc = 'http://localhost:3002'
const her = 'https://being-stockholm.herokuapp.com'

axios.defaults.baseURL = loc

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();
