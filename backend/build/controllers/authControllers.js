"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = yield database_1.default.query("SELECT * FROM users WHERE email = ?", [req.body.email]);
            if (Object.entries(sql).length === 0) {
                const insert = yield database_1.default.query('INSERT INTO users SET ?', [req.body]);
                if (insert) {
                    res.json({ status: true, msg: "Registro exitoso." });
                }
                else {
                    res.json({ status: false, msg: "No se pudo registrar." });
                }
            }
            else {
                res.status(404).json({ message: "El email ya existe." });
            }
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const JWT_Secret = 'your_secret_key';
            const email = req.body.email;
            const password = req.body.password_user;
            const user = req.body;
            if (email == '' || password == '') {
                res.status(404).json({ message: "Todos los campos son obligatorios." });
            }
            else {
                const sql = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
                if (sql.length > 0) {
                    const sql_pas = yield database_1.default.query('SELECT * FROM users WHERE password_user = ?', [password]);
                    if (sql_pas.length > 0) {
                        const token = jsonwebtoken_1.default.sign(user, JWT_Secret);
                        res.status(200).send({
                            signed_user: sql,
                            token: token
                        });
                    }
                    else {
                        res.status(404).json({ message: "Correo electronico ó contraseña incorrectos" });
                    }
                }
                else {
                    res.status(404).json({ message: "Correo electronico ó contraseña incorrectos" });
                }
            }
        });
    }
}
exports.authController = new AuthController();
