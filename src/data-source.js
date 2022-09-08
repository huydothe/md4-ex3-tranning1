"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Huydothe1999@",
    database: "dbTest",
    synchronize: true,
    logging: false,
    entities: ["dist/src/entity/*.js"],
    migrations: ["dist/src/migrations/*.js"]
});
