
/*eslint-disable import/default */
import React from 'react';
// import { Provider } from 'react-redux';
import '../node_modules/semantic-ui-css/semantic.min.css';
import './styles/styles.css';
import './styles/universal.css';
import '../node_modules/toastr/build/toastr.min.css';
import App from './components/App';

import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
