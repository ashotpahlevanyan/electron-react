import {
	CONNECT_DEVICE
} from '../actions/bluetooth';

const INITIAL_STATE = {
	bluetooth: {devices: [], error:null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
	let error;
	switch(action.type) {
		case CONNECT_DEVICE:
			return state;
		default:
			return state;
	}
}