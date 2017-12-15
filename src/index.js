import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import registerServiceWorker from './registerServiceWorker';

// import './styles/global.css';
require('./styles/global.css');


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();