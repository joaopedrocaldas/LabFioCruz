import app = require("teem");
import appsettings = require("./appsettings");

app.run({
	root: appsettings.root,
	port: appsettings.port,
	sqlConfig: appsettings.sqlConfig,
});
