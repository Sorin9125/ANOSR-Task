const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost",
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
    }
});

module.exports = db;