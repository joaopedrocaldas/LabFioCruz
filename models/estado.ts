import app = require("teem");

interface Estado {
    id: number;
    nome: string;
    sigla: string;
}

class Estado {
    public static async listar(): Promise<Estado[]> {
        let lista: Estado[] = [];

        await app.sql.connect(async (sql: app.Sql) => {
            lista = await sql.query("SELECT id, nome, sigla FROM estado ORDER BY sigla");
        });

        return lista;
    }
}

export = Estado;