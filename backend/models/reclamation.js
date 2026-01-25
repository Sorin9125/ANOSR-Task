const { DataTypes } = require("sequelize");
const db = require("../config/db");

const reclamationModel = db.define("reclamations", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    university: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    studentName: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: "",
    }
});

module.exports = reclamationModel;