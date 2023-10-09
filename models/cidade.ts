import app = require("teem");

interface Cidade {
    id: number;
    nome: string;
    idestado: number;
}

class Cidade {
    public static async listar(idestado: number): Promise<Cidade[]> {
        let lista: Cidade[] = [];

        await app.sql.connect(async (sql: app.Sql) => {
            lista = await sql.query(`
            SELECT id, nome, idestado 
              FROM cidade
              Where idestado = ?
              ORDER BY nome`, [idestado]);
        });

        return lista;
    }
}

export = Cidade;