import app = require("teem");
import Projeto = require("../../models/projeto");

class ProjetoApiRoute {
    public async listar(req: app.Request, res: app.Response) {
        res.json(await Projeto.listar(parseInt(req.query["idestado"] as string), parseInt(req.query["idcidade"] as string), parseInt(req.query["idods"] as string), req.query["nome"] as string));
    }
}

export = ProjetoApiRoute;