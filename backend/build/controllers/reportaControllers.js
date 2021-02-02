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
class ReportaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reportas = yield database_1.default.query('SELECT * FROM reporta');
            res.json(reportas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idd } = req.params;
            const reporta = yield database_1.default.query('SELECT * FROM reporta WHERE pro_id = ?', [idd]);
            if (reporta.length > 0) {
                return res.json(reporta[0]);
            }
            res.status(404).json({ text: 'El registro no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO reporta set ?', [req.body]);
            res.json({ message: 'Registro crado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idd } = req.params;
            yield database_1.default.query('UPDATE reporta set ? WHERE pro_id = ?', [req.body, idd]);
            res.json({ message: 'El registro fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idd } = req.params;
            yield database_1.default.query('DELETE FROM reporta WHERE pro_id = ?', [idd]);
            res.json({ message: 'El registro fue eliminado' });
        });
    }
}
const reportaController = new ReportaController();
exports.default = reportaController;
