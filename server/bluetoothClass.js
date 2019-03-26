const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();

/**
 * 1. list pairedDevices -- use device.listPairedDevices
 * 2. list Active devices Around --
 *    use device.scan(function), also use on("found/finished")
 * 3. find Serial Port channel : device.findSerialPortChannel
 * 4. after channel is found, connect to that channel : bluetooth.connect(address, channel)
 * 5. after connecting: read data
 * 6. after connecting: write data
 * 7. disconnect from channel: if channel is null, you are disconnected, else, disconnect
 * 8. reconnect, create a new connection to channel
 * 9.
 *
 * */

/**
 * States
 * */
const DISCOVER_PAIRED_DEVICES = 'DISCOVER_PAIRED_DEVICES';
const DISCOVER_PAIRED_DEVICES_SUCCESS = 'DISCOVER_PAIRED_DEVICES_SUCCESS';
const DISCOVER_PAIRED_DEVICES_FAILURE = 'DISCOVER_PAIRED_DEVICES_FAILURE';

const SCAN_ACTIVE_DEVICES = 'SCAN_ACTIVE_DEVICES';
const SCAN_ACTIVE_DEVICES_SUCCESS = 'SCAN_ACTIVE_DEVICES_SUCCESS';
const SCAN_ACTIVE_DEVICES_FAILURE = 'SCAN_ACTIVE_DEVICES_FAILURE';

const CONNECT_TO_DEVICE = 'CONNECT_TO_DEVICE';
const CONNECT_TO_DEVICE_SUCCESS = 'CONNECT_TO_DEVICE_SUCCESS';
const CONNECT_TO_DEVICE_FAILURE = 'CONNECT_TO_DEVICE_FAILURE';

const DISCONNECT_FROM_DEVICE = 'DISCONNECT_FROM_DEVICE';
const DISCONNECT_FROM_DEVICE_SUCCESS = 'DISCONNECT_FROM_DEVICE_SUCCESS';
const DISCONNECT_FROM_DEVICE_FAILURE = 'DISCONNECT_FROM_DEVICE_FAILURE';

const RECONNECT_FROM_DEVICE = 'RECONNECT_FROM_DEVICE';
const RECONNECT_FROM_DEVICE_SUCCESS = 'RECONNECT_FROM_DEVICE_SUCCESS';
const RECONNECT_FROM_DEVICE_FAILURE = 'RECONNECT_FROM_DEVICE_FAILURE';

const FIND_SERIAL_PORT_CHANNEL = 'FIND_SERIAL_PORT_CHANNEL';
const FIND_SERIAL_PORT_CHANNEL_SUCCESS = 'FIND_SERIAL_PORT_CHANNEL_SUCCESS';
const FIND_SERIAL_PORT_CHANNEL_FAILURE = 'FIND_SERIAL_PORT_CHANNEL_FAILURE';

const READ_DATA_FROM_DEVICE = 'READ_DATA_FROM_DEVICE';
const READ_DATA_FROM_DEVICE_SUCCESS = 'READ_DATA_FROM_DEVICE_SUCCESS';
const READ_DATA_FROM_DEVICE_FAILURE = 'READ_DATA_FROM_DEVICE_FAILURE';

const WRITE_DATA_TO_DEVICE = 'WRITE_DATA_TO_DEVICE';
const WRITE_DATA_TO_DEVICE_SUCCESS = 'WRITE_DATA_TO_DEVICE_SUCCESS';
const WRITE_DATA_TO_DEVICE_FAILURE = 'WRITE_DATA_TO_DEVICE_FAILURE';


let pairedDevices = [];
let activeDevices = [];
let serialPortChannel = "";
let conn = null;

let dataRead = null;
let dataToWrite = null;

device.addDeviceToList = function(item) {
	device.pairedDevices = [];
	device.pairedDevices.push(item);
};

device.discoverPairedDevices = () => {
	device.listPairedDevices(device.addDeviceToList);
};

device
	.on('finished',  function finishedScanning() {
		console.log.bind(console, 'finished');
		// dispatch SCAN_ACTIVE_DEVICES_SUCCESS
	})
	.on('found', function found(address, name){
		activeDevices.push({address: address, name: name});
	});

const scanForActiveDevices = function() {
	activeDevices = [];
	device.scan();
};

const findSerialPortChannel = function({address, name}) {
	// dispatch FIND_SERIAL_PORT_CHANNEL
	device.findSerialPortChannel(address, function(channel) {
		serialPortChannel = channel;
		if(serialPortChannel) {
			//dispatch FIND_SERIAL_PORT_CHANNEL_SUCCESS
		} else {
			//dispatch FIND_SERIAL_PORT_CHANNEL_FAILURE
		}
		console.log(`Found RFCOMM channel for serial port on ${name}: `, channel);
	});
};


const connectToChannel = function({address, channel, name}) {
	bluetooth.connect(address, channel, function(err, connection) {
		if (err) {
			return console.error(err); //dispatch  CONNECT_TO_DEVICE_FAILURE
		}

		// dispatch CONNECT_TO_DEVICE_SUCCESS name, address, channel, connection

		connection.on('data', (buffer) => {
			// process message to be one valid and then
			// dispatch READ_DATA_FROM_DEVICE_SUCCESS
			dataRead = buffer.toString();
			console.log('received message:', buffer.toString());
		});

		// connection.write(new Buffer('Hello!', 'utf-8'), () => {
		// 	console.log("wrote");
		// });
	});
};


const readDataFromDevice = function() {

};

const writeDataToDevice = function() {

};

const disconnectFromDevice = function() {

};

const reconnectToDevice = function() {

};
