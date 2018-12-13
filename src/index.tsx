import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'
import {history, store} from './redux/store'
import registerServiceWorker from './registerServiceWorker'

import './styles/index.css'

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'))
registerServiceWorker()
