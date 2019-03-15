import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { fetchDevices } from '../actions/bluetooth';
import createIpc from 'redux-electron-ipc';
//import createIpc from 'redux-electron-ipc';

// const fs = electron.remote.require('fs');
// const path = electron.remote.require('path');
export const history = createHistory();

const loggerMiddleware = createLogger();

const ipc = createIpc({
	'all-devices-list': fetchDevices,
});

const middleware = [thunk, ipc, routerMiddleware(history), loggerMiddleware];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;