const bluetooth = require('node-bluetooth');

const device = new bluetooth.DeviceINQ();

device.pairedDevices = [];
device.connection = {};

device.addDeviceToList = function(item) {
	device.pairedDevices = [];
	device.pairedDevices.push(item);
};

device.discoverDevices = () => {
	device.listPairedDevices(device.addDeviceToList);
};

device.connectToDevice = ({address, name}) => {
	device.findSerialPortChannel(address, function(channel){
		console.log(`Found RFCOMM channel for serial port on ${name}: `, channel);

		bluetooth.connect(address, channel, function(err, connection){
			if(err) return console.error(err);

			console.log(
				`Connection Successful: {
				name: ${name}, 
				address : ${address}, 
				channel: ${channel},
				connection: ${connection}
				}`
			);

			connection.on('data', (buffer) => {
				console.log('received message:', buffer.toString());
			});

			// connection.write(new Buffer('Hello!', 'utf-8'), () => {
			// 	console.log("wrote");
			// });
		});
	});
};


device.disconnectFromDevice = ({address, name}, cb) => {
		bluetooth.Connection.close(cb);
};

module.exports = device;