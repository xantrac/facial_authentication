import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }

ReactDOM.render(

<AlertProvider template={AlertTemplate} {...options}>
    <App />
</AlertProvider>
, document.getElementById('root'));

registerServiceWorker();
