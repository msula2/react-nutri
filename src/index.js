import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tachyons';
import 'react-tooltip/dist/react-tooltip.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime2/lib/css/blueprint-datetime2.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


