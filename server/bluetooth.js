const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();
const ipc = require('../src/js/actions/ipcActions');


/**
 * Device Data structures
 * */
device.pairedDevices = [];
device.activeDevices = [];
device.connection = {};
let dataRead = '';
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

device.connectToDevice = function(event, args){
	const {address} = args.device;
	device.findSerialPortChannel(address, function(channel){
		event.sender.send(ipc.IPC_FIND_SERIAL_PORT_CHANNEL_SUCCESS, {connection: {...args, channel : channel}});
		try {
			bluetooth.connect(address, channel, function(error, connection){
				if(error) {
					console.log(error);
					return event.sender.send(ipc.IPC_CONNECT_TO_DEVICE_FAILURE, {error: error});
				}
				device.connection = connection;
				event.sender.send(ipc.IPC_CONNECT_TO_DEVICE_SUCCESS, {connection: connection});
				connection.delimiter = Buffer.from('\n', 'utf-8');

				connection.on('data', (buffer) => {
					let bufferString = buffer.toString('utf-8');
					if(bufferString.length === 25) {
						dataRead = bufferString;
						event.sender.send(ipc.IPC_READ_DATA_FROM_DEVICE_SUCCESS, {data: dataRead});
						dataRead = '';
					} else {
						dataRead += bufferString;
						if(dataRead.length === 25) {
							event.sender.send(ipc.IPC_READ_DATA_FROM_DEVICE_SUCCESS, {data: dataRead});
							dataRead = '';
						}
					}
				});

			});
		} catch (error) {
				device.connection = null;
				device.activeDevices = [];
				event.sender.send(ipc.IPC_DISCONNECT_FROM_DEVICE_SUCCESS, {error: error});
		}
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


device.disconnectFromDevice = function(event, args) {
		try {
			device.connection.close(function cb() {
				event.sender.send(ipc.IPC_DISCONNECT_FROM_DEVICE_SUCCESS, {error: {}});
				device.connection = null;
			});
		} catch (error) {
			event.sender.send(ipc.IPC_DISCONNECT_FROM_DEVICE_FAILURE, {error: error});
		}
};

module.exports = device;