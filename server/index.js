const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const device = require("./bluetooth.js");

const app = express();
let connectionObj;
app.use(bodyParser.json({extended: true}));

app.get("/", (req, res) => {
	res.json({val : "300"});
});

app.get("/devices", (req, res) => {
	device.discoverDevices();
	const devices = device.pairedDevices;
	res.json({devices: devices});
});

app.get("/connection", (req, res) => {
	const deviceItem = req.body.deviceItem;
	if(device.pairedDevices && device.pairedDevices.indexOf(deviceItem) > -1) {
		let connection = device.connectToDevice(deviceItem);
		if(connection.status) {
			connectionObj = connection;
			res.json({connected: true});
		}
	}
	res.json({connected: false});
});

app.get("/read", (req, res) => {
	res.json({val : "read"});
});

app.post("/write", (req, res) => {
	res.json({val : "write"});
});

app.listen(port, () => {
	console.log(`Listening to Port : ${port}`);
});
