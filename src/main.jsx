import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles.css';
import { ClinicaApp } from './ClinicaApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClinicaApp />
    </BrowserRouter>
  </React.StrictMode>
)
