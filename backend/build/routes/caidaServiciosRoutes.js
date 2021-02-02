"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const caidaServController_1 = __importDefault(require("../controllers/caidaServController"));
class CaidaServiciosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/select', caidaServController_1.default.list_incident);
        this.router.get('/', caidaServController_1.default.list);
        this.router.get('/:Id_service', caidaServController_1.default.getOne);
        this.router.post('/', caidaServController_1.default.create);
        this.router.put('/:Id_service', caidaServController_1.default.update);
        this.router.delete('/:Id_service', caidaServController_1.default.delete);
    }
}
const caidaServiciosRoutes = new CaidaServiciosRoutes();
exports.default = caidaServiciosRoutes.router;
