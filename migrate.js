import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { sequelize } from "./models/db.js";

const DB_NAME = "crud";

const modelsPath = path.join(process.cwd(), "models");
const modelFiles = fs.readdirSync(modelsPath).filter(f => f.endsWith(".js") && f !== "db.js");

const { createDb } = await inquirer.prompt([
  { type: "confirm", name: "createDb", message: "Database 'crud' may not exist. Do you want to create it?", default: true }
]);

if (createDb) {
  await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
  console.log("✅ Database created (if it did not exist)");
}

const importedModels = {};
for (const file of modelFiles) {
  const mod = await import(pathToFileURL(path.join(modelsPath, file)).href);
  const modelName = Object.keys(mod)[0];
  importedModels[modelName] = mod[modelName];
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");
  await sequelize.sync({ force: true });
  console.log("✅ Tables created for all models!");
} catch (err) {
  console.error("❌ Migration failed:", err);
} finally {
  process.exit();
};