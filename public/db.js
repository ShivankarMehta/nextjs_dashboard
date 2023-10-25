import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Shivankar@123",
  database: "dummydatabase",
});

export default pool;
