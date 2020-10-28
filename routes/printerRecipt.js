var router = require("express").Router();

const escpos = require("escpos");
escpos.Network = require("escpos-network");

router.get("/printer_v2", (req, res) => {
	const networkDevice = new escpos.Network("192.168.100.104", 9100);
	const printer = new escpos.Printer(networkDevice);

	networkDevice.open(function (err) {
		printer
			.font("a")
			.align("ct")
			.style("bu")
			.size(1, 1)
			.text("The quick brown fox jumps over the lazy dog")
			.text("敏捷的棕色狐狸跳过懒狗")
			.barcode("1234567", "EAN8")
			.table(["One", "Two", "Three"])
			.tableCustom(
				[
					{ text: "Left", align: "LEFT", width: 0.33, style: "B" },
					{ text: "Center", align: "CENTER", width: 0.33 },
					{ text: "Right", align: "RIGHT", width: 0.33 },
				],
				{ encoding: "cp857", size: [1, 1] } // Optional
			)
			.qrimage("https://github.com/song940/node-escpos", function (err) {
				this.cut();
				this.close();
			});
	});
	res.send({
		message: "OKE",
	});
});

module.exports = router;
