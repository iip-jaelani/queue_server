const { route } = require("./printer");

var router = require("express").Router();

router.use("/api/v1", require("./printer"));
router.all("*", (req, res) =>
	res.send({
		error: true,
		message: "What are you doing ?",
	})
);
module.exports = router;
