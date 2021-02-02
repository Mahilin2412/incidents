"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registroController_1 = __importDefault(require("../controllers/registroController"));
class RegistroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', registroController_1.default.list);
        this.router.get('/:id', registroController_1.default.getOne);
        this.router.post('/', registroController_1.default.create);
        this.router.put('/:id', registroController_1.default.update);
        this.router.delete('/:id', registroController_1.default.delete);
    }
}
const registroRoutes = new RegistroRoutes();
exports.default = registroRoutes.router;
