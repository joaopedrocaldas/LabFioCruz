import app = require("teem");
import Cidade = require("../../models/cidade");

class CidadeApiRoute {
    public async listar(req: app.Request, res: app.Response) {
        res.json(await Cidade.listar(parseInt(req.query["idestado"] as string)));
    }
}

export = CidadeApiRoute;