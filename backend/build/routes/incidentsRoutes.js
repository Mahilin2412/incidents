"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incidentsControllers_1 = __importDefault(require("../controllers/incidentsControllers"));
class IncidentsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/products', incidentsControllers_1.default.list_products);
        this.router.get('/', incidentsControllers_1.default.list);
        this.router.get('/:id', incidentsControllers_1.default.getOne);
        this.router.post('/', incidentsControllers_1.default.create);
        this.router.put('/:id', incidentsControllers_1.default.update);
        this.router.delete('/:id', incidentsControllers_1.default.delete);
    }
}
const incidentsRoutes = new IncidentsRoutes();
exports.default = incidentsRoutes.router;
