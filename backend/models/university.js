const { DataTypes } = require("sequelize");
const db = require("../config/db");

const universityModel = db.define("universities", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

module.exports = universityModel;