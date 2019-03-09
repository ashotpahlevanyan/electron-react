const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const device = require("./bluetooth.js");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({extended: true}));
app.use(cors());

let connectionObj;

let readData;


app.get("/", (req, res) => {
	device.discoverDevices();
	const devices = device.pairedDevices;
	res.json({devices: devices});
});

app.get("/connect", async (req, res) => {
	const {address, name} = req.body;
	try {
		const connection = await device.connectToDevice({address, name});
		console.log("=====Connection===== : ", connection);
		res.json({connected: true, connection: connection});
	} catch(error) {
		res.json({error: error, connected: false});
	}
});

app.get("/read", (req, res) => {

	res.json({val : "read" + Date.now().toLocaleString()});
});

app.post("/write", (req, res) => {
	res.json({val : "write"});
});

app.listen(port, () => {
	console.log(`Listening to Port : ${port}`);
});
