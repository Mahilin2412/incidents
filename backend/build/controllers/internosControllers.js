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
class InternoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registros = yield database_1.default.query("SELECT id_internos, name_pro, Date_format(fecha,'%Y-%M-%d %h:%i:%s %p') AS fecha,incidente,name_product,origen,tramito FROM internos JOIN reporta ON pkfk_id_reporta =  pro_id JOIN products ON pkfk_id_producto = product_id");
            res.json(registros);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const registro = yield database_1.default.query('SELECT * FROM internos WHERE id_internos = ?', [id]);
            if (registro.length > 0) {
                return res.json(registro[0]);
            }
            res.status(404).json({ text: 'El registro no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO internos set ?', [req.body]);
            res.json({ message: 'Registro crado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE internos set ? WHERE id_internos = ?', [req.body, id]);
            res.json({ message: 'El registro fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM internos WHERE id_internos = ?', [id]);
            res.json({ message: 'El registro fue eliminado' });
        });
    }
}
const internoController = new InternoController();
exports.default = internoController;
