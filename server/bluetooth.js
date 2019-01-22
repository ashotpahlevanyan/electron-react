const bluetooth = require('node-bluetooth');

const device = new bluetooth.DeviceINQ();

device.pairedDevices = [];

device.addDeviceToList = function(item) {
	device.pairedDevices.push(item);
};

device.discoverDevices = function() {
	device.listPairedDevices(device.addDeviceToList);
};

device.connectToDevice = function(deviceItem) {
	device.findSerialPortChannel(deviceItem.address, function(channel){
		console.log(`Found RFCOMM channel for serial port on ${deviceItem.name}: `, channel);

		try {
			bluetooth.connect(deviceItem.address, channel, function(err, connection){
				//if(err) return console.error(err);
				console.log(`Connection Successful: {\n name: ${deviceItem.name}, \n address : ${deviceItem.address}, \n channel: ${channel} \n }`);


				connection.on('data', (buffer) => {
					console.log('received message:', buffer.toString());
				});

				// connection.write(new Buffer('Hello!', 'utf-8'), () => {
				// 	console.log("wrote");
				// });

				return {status: 1, error: {}, connection: connection};
			});
		} catch (err) {
			return { status: 0, error: err, connection: {} };
		}
	});
};

module.exports = device;