import React from 'react';
import ReactDOM from 'react-dom';
import'./index.css';
import * as serviceWorker from './serviceWorker';
import Game from './App';
ReactDOM.render(<Game/>,document.getElementById('root'));

serviceWorker.unregister();
