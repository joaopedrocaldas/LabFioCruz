import app = require("teem");
import Ods = require("../../models/ods");

class OdsApiRoute {
    public async listar(req: app.Request, res: app.Response) {
        res.json(await Ods.listar());
    }
}

export = OdsApiRoute;