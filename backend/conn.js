import { Sequelize } from "sequelize";

const db = new Sequelize('cqadb', 'root', 'Tsunami123!', {
    host: "localhost",
    dialect: "mysql"
});

export default db;