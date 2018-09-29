import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { fetchData } from './lib/data';

ReactDOM.render(<App />, document.getElementById('root'));
fetchData();
registerServiceWorker();
