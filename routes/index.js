const { route } = require("./printer");

var router = require("express").Router();

router.use("/api/v1", require("./printer"));
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
