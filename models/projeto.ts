import app = require("teem");

interface Projeto {
	id: number;
	nome: string;
	autor: string;
	sigla: string;
}

class Projeto {
	public static async listar(idestado: number): Promise<Projeto[]> {
		let lista: Projeto[] = [];

		await app.sql.connect(async (sql: app.Sql) => {
			lista = await sql.query(`
			SELECT p.id, p.nome, p.autor, sigla FROM projeto p
				INNER JOIN estado e on p.idestado = e.id
				WHERE idestado = ?
				ORDER BY nome`, [idestado]);
		});

		return lista;
	}
}

export = Projeto;