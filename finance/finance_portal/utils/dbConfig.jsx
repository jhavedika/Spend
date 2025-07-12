import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Budgets, Incomes, Expenses } from './schema'

const sql = neon(
    "postgresql://neondb_owner:npg_Xmw5FZ1bkDCV@ep-lively-brook-a4gmp0be-pooler.us-east-1.aws.neon.tech/spend%20Wise?sslmode=require"
);

export const db = drizzle(sql, { schema: { Budgets, Incomes, Expenses } });