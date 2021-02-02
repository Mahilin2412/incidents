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
const database_1 = __importDefault(require("../database"));
class RegistroController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registros = yield database_1.default.query("SELECT id, Date_format(fecha, '%Y-%m-%d T %h:%i') AS fecha, inl_IM, relacionado, usuario, name_product FROM incidente JOIN incident_log ON fk_incidente = incident_log_id JOIN products ON pkfk_id_producto = product_id");
            res.json(registros);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const registro = yield database_1.default.query("SELECT id, Date_format(fecha, '%Y-%m-%dT%h:%i') AS fecha, fk_incidente, relacionado, usuario, pkfk_id_producto FROM incidente JOIN incident_log ON fk_incidente = incident_log_id JOIN products ON pkfk_id_producto = product_id = ?", [id]);
            if (registro.length > 0) {
                return res.json(registro[0]);
            }
            res.status(404).json({ text: 'El registro no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const insert = yield database_1.default.query('INSERT INTO incidente set ?', [req.body]);
            if (insert) {
                res.json({ status: true, msg: "Datos guardatos correctamente." });
            }
            else {
                res.json({ status: false, msg: "No se pudo almacenar los datos." });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const actualizar = yield database_1.default.query('UPDATE incidente set ? WHERE id = ?', [req.body, id]);
            if (actualizar) {
                res.json({ status: true, message: "Datos actualizados correctamente." });
            }
            else {
                res.json({ status: false, message: "No se pudo actualizar los datos." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM incidente WHERE id = ?', [id]);
            res.json({ message: 'El registro fue eliminado' });
        });
    }
}
const registroController = new RegistroController();
exports.default = registroController;
