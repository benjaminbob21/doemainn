"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("postgresql://bob:gAVOpK7Vwea3jaw7YbMkh6B1rNYZcSs0@dpg-cr7vsodsvqrc73dlv4f0-a.oregon-postgres.render.com/doeproject_tmju", {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true, // Use true if SSL certificates are fully validated
        },
    },
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection to the database has been established successfully.");
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
