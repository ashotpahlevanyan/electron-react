const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();
const ipc = require('../src/js/actions/ipcActions');


/**
 * Device Data structures
 * */
device.pairedDevices = [];
device.activeDevices = [];
device.connection = {};

/**
 * Device Helper INNER Functions
 * */
addPairedDeviceToList = function(item) {
	device.pairedDevices = [];
	device.pairedDevices.push(item);
};

/**
 * Device Interface OUTER Functions
 * */
device.fetchPairedDevices = () => {
	device.listPairedDevices(addPairedDeviceToList);
};

device.scanActiveDevices = function(event, args) {
	const activeDeviceList = [];
	device
		.on("finished", function finished() {
			event.sender.send(ipc.IPC_SCAN_ACTIVE_DEVICES_SUCCESS, {devices: activeDeviceList});
		})
		.on("found", function found(address, name){
			activeDeviceList.push({address: address, name: name});
		})
		.scan();
};

device.connectToDevice = (event, {address, name}) => {
	device.findSerialPortChannel(address, function(channel){
		console.log(`Found RFCOMM channel for serial port on ${name}: `, channel);

		bluetooth.connect(address, channel, function(error, connection){
			if(error) {
				console.log(error);
				return event.sender.send(ipc.IPC_CONNECT_TO_DEVICE_FAILURE, {error: error});
			}

			device.connection = connection;

			console.log(
				`Connection Successful: {
				name: ${name},
				address : ${address},
				channel: ${channel},
				connection: ${connection}
				}`
			);

			connection.on('data', (buffer) => {
				let bufferString = buffer.toString();
				console.log('received message:', bufferString);
				event.sender.send(ipc.IPC_READ_DATA_FROM_DEVICE_SUCCESS, {data: bufferString});
			});

		});
	});
};

device.writeDataToDevice = function(event, data) {
	try {
		device.connection.write(new Buffer(data, 'utf-8'), () => {
			event.sender.send(ipc.IPC_WRITE_DATA_TO_DEVICE_SUCCESS);
		});
	} catch(error) {
		event.sender.send(ipc.IPC_WRITE_DATA_TO_DEVICE_FAILURE, {error: error});
	}
};


device.disconnectFromDevice = ({address, name}, cb = function() {

}) => {
		bluetooth.Connection.close(cb);
};

module.exports = device;