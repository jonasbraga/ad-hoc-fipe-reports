"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1.default.config();
//@ts-ignore
dotenv_1.default.config({ path: path_1.default.resolve });
//Config to connect to the database
var db = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: process.env.DB_HOST,
        //@ts-ignore
        port: Number.parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
});
exports.default = db;
