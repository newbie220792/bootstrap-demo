import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
// import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
);
