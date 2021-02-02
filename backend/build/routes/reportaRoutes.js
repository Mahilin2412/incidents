"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportaController_1 = __importDefault(require("../controllers/reportaController"));
class ReportaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', reportaController_1.default.list);
        this.router.get('/:idd', reportaController_1.default.getOne);
        this.router.post('/', reportaController_1.default.create);
        this.router.put('/:idd', reportaController_1.default.update);
        this.router.delete('/:idd', reportaController_1.default.delete);
    }
}
const reportaRoutes = new ReportaRoutes();
exports.default = reportaRoutes.router;
