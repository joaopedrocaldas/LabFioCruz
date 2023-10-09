import app = require("teem");
import Projeto = require("../models/projeto");
import Estado = require("../models/estado");
import Ods = require("../models/ods");
import Cidade = require("../models/cidade");

class IndexRoute {
	public static async index(req: app.Request, res: app.Response): Promise<void> {
		res.render("index", {
			ods: await Ods.listar(),
			estados: await Estado.listar(),
			pagina: "index"
		});
	}

	public static async quemSomos(req: app.Request, res: app.Response) {
		res.render("index/quemSomos", {
			layout: "layout"
		});
	}

	public static async create(req: app.Request, res: app.Response) {
		res.render("index/create", {
			layout: "layout"
		});
	}
}
export = IndexRoute;

