import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:3002'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();
