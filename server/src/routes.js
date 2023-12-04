"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbController_1 = require("./controllers/DbController");
var routes = express_1.default.Router();
var dbController = new DbController_1.default();
//Here are the routes that can be accessed
routes.post('/', dbController.dbSearch);
exports.default = routes;
