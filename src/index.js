// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter } from "react-router-dom";

// Ours
import './index.css';
import App from './App/App.js';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
