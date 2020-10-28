const { route } = require("./printerThermal");

var router = require("express").Router();

router.use("/api/v1", require("./printerThermal"));
router.use("/api/v1", require("./printerRecipt"));
router.use("/", (req, res) =>
	res.send({
		status: "200OK",
	})
);
router.all("*", (req, res) =>
	res.send({
		error: true,
		message: "What are you doing !!!",
		ip: req.ip,
	})
);
module.exports = router;
