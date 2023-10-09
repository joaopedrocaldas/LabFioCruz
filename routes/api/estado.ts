import app = require("teem");
import Estado = require("../../models/estado");

class EstadoApiRoute {
    public async listar(req: app.Request, res: app.Response) {
        res.json(await Estado.listar());
    }
}

export = EstadoApiRoute;