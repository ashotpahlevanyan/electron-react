const electron = require('electron');
const { ipcMain } = require('electron');
const device = require('./src/utils/bluetooth');
const ipc = require('./src/js/actions/ipcActions');

/*
* Module to control application life.
* */
const app = electron.app;
/*
* Module to create native browser window.
* */
const BrowserWindow = electron.BrowserWindow;


const path = require('path');
const url = require('url');
app.commandLine.appendSwitch('enable-experimental-web-platform-features', true);
app.commandLine.appendSwitch('enable-web-bluetooth', true);

/*
* Keep a global reference of the window object, if you don't, the window will
* be closed automatically when the JavaScript object is garbage collected.
* */
let mainWindow;


function createWindow() {
	/*
	* Create the browser window.
	* */
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
		experimentalFeatures: true,
		webPreferences: {
			nodeIntegration: true
		}
	});
	let contents = mainWindow.webContents;
	contents.executeJavaScript('console.log(this)')
		.then(console.log)
		.catch(console.error);

	/*
	* Load the index.html of the app.
	* mainWindow.loadURL('http://localhost:3000');
	* */
	const startUrl = process.env.ELECTRON_START_URL || url.format({
			pathname: path.join(__dirname, '/public/index.html'),
			protocol: 'file:',
			slashes: true
		});
	mainWindow.loadURL(startUrl);

	/*
	* Open the DevTools.
	* */
	mainWindow.webContents.openDevTools();

	/*
	* Emitted when the window is closed.
	*
	* Dereference the window object, usually you would store windows
	* in an array if your app supports multi windows, this is the time
	* when you should delete the corresponding element.
	* */
	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	const {
		default: installExtension,
		REACT_DEVELOPER_TOOLS
	} = require('electron-devtools-installer');

	//require('electron-react-devtools').install();


	installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
		console.log(`Added Extension: ${name}`);
	}).catch((err) => {
		console.log(`An Error occurred: ${err}`);
	});

}

/*
* This method will be called when Electron has finished
* initialization and is ready to create browser windows.
* Some APIs can only be used after this event occurs.
* */
app.on('ready', createWindow);

/*
* Quit when all windows are closed.
* */
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});


/**
 * IPC Main Listener Initializations
 * */
ipcMain.on(ipc.IPC_FETCH_PAIRED_DEVICES, (event, args) => {
	try {
		device.fetchPairedDevices();
		const devices = device.pairedDevices;
		event.sender.send(ipc.IPC_FETCH_PAIRED_DEVICES_SUCCESS, {devices: devices[0]});
	} catch (error) {
		event.sender.send(ipc.IPC_FETCH_PAIRED_DEVICES_FAILURE, {error: error});
	}
});

ipcMain.on(ipc.IPC_SCAN_ACTIVE_DEVICES, (event, args) => {
	device.scanActiveDevices(event, args);
});

ipcMain.on(ipc.IPC_CONNECT_TO_DEVICE, (event, args) => {
	device.connectToDevice( event, args );
});

ipcMain.on(ipc.IPC_DISCONNECT_FROM_DEVICE, (event, args) => {
	device.disconnectFromDevice(event, args);
});

ipcMain.on(ipc.IPC_WRITE_DATA_TO_DEVICE, (event, args) => {
	const { data } = args;
	device.writeDataToDevice(event, data);
});

// ipcMain.on(ipc.IPC_READ_DATA_FROM_DEVICE, (event) => {
// 	let data;
// 	try {
// 		device.write(new Buffer(data.toString(), 'utf-8'), () => {
// 			event.sender.send(ipc.IPC_READ_DATA_FROM_DEVICE_SUCCESS);
// 		});
// 	} catch (error) {
// 		event.sender.send(ipc.IPC_READ_DATA_FROM_DEVICE_FAILURE, {error: error});
// 	}
// });
