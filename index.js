var express = require("express"),
	bodyParser = require("body-parser");
//INITIAL APP

const app = express();
//PORT
const port = process.env.PORT || 9100;
app.use(bodyParser.json());
//ROUTES
app.use(require("./routes"));
//LISTING APPS
app.listen(port, () => console.log("LISTEN ON PORT", port));
