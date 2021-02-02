"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', authControllers_1.authController.create);
        this.router.post('/authentication', authControllers_1.authController.auth);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
