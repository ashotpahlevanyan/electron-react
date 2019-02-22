import { combineReducers } from 'redux';
import BluetoothReducer from './bluetooth';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
	bluetooth: BluetoothReducer,
	form: formReducer,
});

export default rootReducer;