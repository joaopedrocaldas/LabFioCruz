import app = require("teem");

interface Projeto {
	id: number;
	idusuario: number;
	aprovado: number;
	//banco: BancoTecnologia;
	resumoods: string;
	autor: string;
	telefone: string;
	email: string;
	idestado: number;
	sigla: string;
	idcidade: number;
	cidade: string;
	logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cep: string;
	latitude: number;
	longitude: number;
	nome: string;
	exposicao: number;
	versaoimagem: number;
	info: string;
	link: string | null;
	criacao: string;

	//ods?: ODS[];

	arquivoIcone?: string | null;
	arquivoImagem?: string | null;
}

interface ProjetoInfo {
	publico: string;
	descricao: string;
	//macrocategoria: MacroCategoria[];
	escalonamento: string;
	local: string;
	//abrangencia: Abrangencia;
	parceiros: string;
	//status: Status;
	financiamento: string;
	replicabilidade: string;
	//divulgacao: Divulgacao[];
	links: string[];
	//caracteristica: Caracteristica[];
}

class Projeto {

	public static async obter(id: number): Promise<Projeto> {

		let lista: Projeto[] = [];
		let where = "where p.id = ?"
		let parametros = [id];

		await app.sql.connect(async (sql: app.Sql) => {
			lista = await sql.query(`
			SELECT p.id, p.nome, p.autor, e.sigla, c.nome 'cidade'  FROM projeto p
				INNER JOIN estado e on p.idestado = e.id
				INNER JOIN cidade c on p.idcidade = c.id
				${where}`, parametros);
		});



		return lista[0];
	}

	public static async listar(idestado: number, idcidade: number, idods: number, nome: string): Promise<Projeto[]> {
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

		if (idods) {
			where += (where ? " and " : " where ");
			where += "(p.resumoods LIKE ? or p.resumoods LIKE ? or p.resumoods LIKE ?)";
			parametros.push(idods);
			parametros.push(`%,${idods}`);
			parametros.push(`%,${idods},%`);
		}

		if (nome) {
			where += (where ? " and " : " where ");
			where += "p.nome LIKE ?";
			parametros.push(`%${nome}%`);
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