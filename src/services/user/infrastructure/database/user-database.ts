import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../adapters/secondary/postgres/user.schema";

export function createUserDatabase(databaseUrl: string) {
	const pool = new Pool({ connectionString: databaseUrl });
	const db = drizzle(pool, { schema });

	return { pool, db };
}
