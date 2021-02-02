"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const internosController_1 = __importDefault(require("../controllers/internosController"));
class InternoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', internosController_1.default.list);
        this.router.get('/:id', internosController_1.default.getOne);
        this.router.post('/', internosController_1.default.create);
        this.router.put('/:id', internosController_1.default.update);
        this.router.delete('/:id', internosController_1.default.delete);
    }
}
const internoRoutes = new InternoRoutes();
exports.default = internoRoutes.router;
