//pg module creates cxn pool (reusable db cxns so dont have to make new cxn each db request)

import { Pool } from "pg"

//create pool instance

const pool = new Pool({
    user: "postgres",
    password:"M10w!N10w", 
    host: "localhost",
    port: 5432,
    database: "contractgeneratordb",
    max:20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default pool