import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import App from './App';
import { AccountProvider } from './context/AccountContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
