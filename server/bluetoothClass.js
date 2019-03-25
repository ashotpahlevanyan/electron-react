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

let pairedDevices = [];
let activeDevices = [];
let serialPortChannel = "";
let conn = null;
let dataRead = null;
let dataToWrite = null;
let connectionStatus = "connected";

device.addDeviceToList = function(item) {
	device.pairedDevices = [];
	device.pairedDevices.push(item);
};

device.discoverDevices = () => {
	device.listPairedDevices(device.addDeviceToList);
};

const listPairedDevices = function() {

};
const scanForDevices = function() {

};

const findSerialPortChannel = function() {

};

const connectToChannel = function() {

};

const readDataFromDevice = function() {

};

const writeDataToDevice = function() {

};

const disconnectFromDevice = function() {

};

const reconnectToDevice = function() {

};
