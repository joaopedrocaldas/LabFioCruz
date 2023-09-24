import app = require("teem");

class IndexRoute {
	public static async index(req: app.Request, res: app.Response): Promise<void> {
		res.render("index/index", {
			layout: "layout"
		});
	}

	public static async quemSomos(req: app.Request, res: app.Response) {
		res.render("index/quemSomos", {
			layout: "layout"
		});
	}
}
export = IndexRoute;

