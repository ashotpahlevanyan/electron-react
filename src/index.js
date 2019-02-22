import React from 'react';
import { render } from 'react-dom';
import store from './js/store/index';
import Root from './js/Root';
import * as serviceWorker from './serviceWorker';

console.log(store.getState());

render(
	<Root store = {store}/>,
	document.getElementById('root')
);

if(module.hot) {
	module.hot.accept();
}

/*
* If you want your app to work offline and load faster, you can change
* unregister() to register() below. Note this comes with some pitfalls.
* Learn more about service workers: http://bit.ly/CRA-PWA
* */
serviceWorker.register();
