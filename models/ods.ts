import app = require("teem");

interface Ods {
    id: number;
    nome: string;
}

class Ods {
    public static async listar(): Promise<Ods[]> {
        let lista: Ods[] = [];

        await app.sql.connect(async (sql: app.Sql) => {
            lista = await sql.query("SELECT id, nome FROM ods");
        });

        return lista;
    }
}

export = Ods;