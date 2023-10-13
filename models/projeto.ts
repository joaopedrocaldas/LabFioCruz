import app = require("teem");

interface Projeto {
	id: number;
	nome: string;
	autor: string;
	sigla: string;
}

class Projeto {
	public static async listar(idestado: number, idcidade: number, idods: number): Promise<Projeto[]> {
		let lista: Projeto[] = [];

		let where = "";
		let parametros: any[] = [];

		if (idestado) {
			where += (where ? " and " : " where ");
			where += "p.idestado = ?";
			parametros.push(idestado);
		}

		if (idcidade) {
			where += (where ? " and " : " where ");
			where += "p.idcidade = ?";
			parametros.push(idcidade);
		}

		//perguntar pro rafa sobre os ()
		if (idods) {
			where += (where ? " and " : " where ");
			where += "(p.resumoods LIKE ? or p.resumoods LIKE ? or p.resumoods LIKE ?)";
			parametros.push(idods);
			parametros.push(`%,${idods}`);
			parametros.push(`%,${idods},%`);
		}

		await app.sql.connect(async (sql: app.Sql) => {
			lista = await sql.query(`
			SELECT p.id, p.nome, p.autor, sigla FROM projeto p
				INNER JOIN estado e on p.idestado = e.id
				${where}
				ORDER BY nome`, parametros);
		});

		return lista;
	}
}

export = Projeto;