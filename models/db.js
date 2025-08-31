import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("crud", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
