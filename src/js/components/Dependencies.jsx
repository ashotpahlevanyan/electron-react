const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

// let electron;
// let ipcRenderer;
//
// async function loadDependencies() {
// 	electron = await window.require('electron');
// 	ipcRenderer = await electron.ipcRenderer;
// }

export default function initIpcRenderer() {
		ipcRenderer.on('all-devices-list', (event, arg) => {
			console.log('devicesList', arg);
			const {devices} = arg;

			//this.setState({devices: devices[0], selectedAddress: devices[0][0].address});
		});

		ipcRenderer.on('device-is-connected', (event, arg) => {
			const {connected, connection} = arg;
			console.log(connected, connection);
		});

		ipcRenderer.on('device-not-connected',  (event, arg) => {
			const {error, connected} = arg;
			console.log(error, connected);
		});

		ipcRenderer.on('device-is-disconnected', (event, arg) => {
			const {disconnected, connection} = arg;
			console.log(disconnected, connection);
		});

		ipcRenderer.on('device-not-disconnected', (event, arg) => {
			const {error, disconnected} = arg;
			console.log(error, disconnected);
		});

		return ipcRenderer;
};

