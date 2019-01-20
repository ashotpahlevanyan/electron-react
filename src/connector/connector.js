const noble = require('noble');

module.exports = {
	stateChange: () => {
		noble.on('stateChange', callback(state));
	},
	startScanning: () => {
		noble.startScanning()
	},
	stopScanning: () => {
		noble.stopScanning()
	},
	listPeripherals: () => {
		const devices = [];
		devices.push({first: "Empty"});

		return devices;
	},
	peripheralConnect: (peripheral) => {
		peripheral.connect();
	},
	peripheralDisconnect: (peripheral) => {
		peripheral.disconnect();
	},
	peripheralDiscoverServices: (peripheral) => {
		peripheral.discoverServices();
	},
	peripheralDiscoverAll: (peripheral) => {
		peripheral.discoverAllServicesAndCharacteristics();
	},
	serviceDiscoverIncludedServices: (service) => {
		service.discoverIncludedServices();
	}
};