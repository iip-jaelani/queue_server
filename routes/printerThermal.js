var router = require("express").Router();
var Moment = require("moment");
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

router.post("/print_queue", async (req, res) => {
	const { serviceName, numberQueue, namePartner, host } = req.body;
	const hostIp = host;
	let printer = new ThermalPrinter({
		type: PrinterTypes.EPSON,
		interface: `tcp://${hostIp}:9100`, // Printer interface
		lineCharacter: "-",
		options: {
			timeout: 1000,
		},
		characterSet: "SLOVENIA", // Character set - default: SLOVENIA
		removeSpecialCharacters: false, // Removes special characters - default: false
	});

	let isConnect = await printer.isPrinterConnected();
	console.log(isConnect);
	if (!isConnect) {
		res.send({
			message: "Error connect printer",
			error: true,
		});
	}
	printer.bold(true);
	printer.alignCenter();
	printer.setTextSize(1, 1);
	printer.println(`${namePartner}`);
	printer.newLine();
	printer.newLine();
	printer.println(`${serviceName}`);
	printer.newLine();
	printer.newLine();
	printer.setTextSize(4, 4);
	printer.println(`${numberQueue}`);
	printer.newLine();
	printer.newLine();
	printer.setTextNormal();
	printer.drawLine();
	printer.println(
		`Tanggal: ${Moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")}`
	);
	printer.drawLine();
	printer.cut();
	try {
		printer.execute().then((response) => {
			console.log(response);
			res.send({
				message: "success print data",
				error: false,
			});
		});
	} catch (error) {
		res.send({
			message: "failed print data",
			error: true,
		});
		console.log("Print failed:", error);
	}
});

module.exports = router;
