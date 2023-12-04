"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = require("./routes");
var cors_1 = require("cors");
//Express create an API
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Accept the routes at 'routes.ts'
app.use(routes_1.default);
//Port used
app.listen(3333);
