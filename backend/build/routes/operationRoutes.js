"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operationController_1 = __importDefault(require("../controllers/operationController"));
class OperationRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', operationController_1.default.list);
        this.router.get('/:Id_operation', operationController_1.default.getOne);
        this.router.post('/', operationController_1.default.create);
        this.router.put('/:Id_operation', operationController_1.default.update);
        this.router.delete('/:Id_operation', operationController_1.default.delete);
    }
}
const operationRoutes = new OperationRoutes();
exports.default = operationRoutes.router;
