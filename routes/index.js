var router = require("express").Router();

router.use("/api/v1", require("./printer"));

module.exports = router;
