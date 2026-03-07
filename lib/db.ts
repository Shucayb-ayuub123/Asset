import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const DB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Zx9!Qa7#Lm2@Vp6$Rt",
  database: "asset_db",
  
});

try {
  const connection = await DB.getConnection()
  console.log("Database connected")
  connection.release()
} catch (error) {
  console.error("Database connection failed")
  process.exit(1)
}