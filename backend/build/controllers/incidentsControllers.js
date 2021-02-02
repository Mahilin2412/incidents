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
class IncidentsController {
    list_products(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query("SELECT * FROM products");
            res.setHeader('Content-Type', 'application/json; charset=UTF-8');
            res.json(products);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query("SELECT inl.incident_log_id, p.acronym_product, inl.inl_IM, inl.inl_description, DATE_FORMAT(inl.escalation_date, '%d-%m-%Y') as escalation_date, inl.scaled_to, inl.inl_status, DATE_FORMAT(inl.closing_date, '%d-%m-%Y') as closing_date, inl.inl_comments, TIMESTAMPDIFF(DAY, inl.escalation_date, CURDATE()) as scalation_time, IF(inl.closing_date IS NULL OR incident_log_id = incident_log_id, TIMESTAMPDIFF(DAY, inl.escalation_date, CURDATE()), TIMESTAMPDIFF(DAY, inl.escalation_date, inl.closing_date)) as scalation_times, inl.user_processed FROM incident_log inl INNER JOIN products p ON inl.fk_product_id = p.product_id");
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const incident = yield database_1.default.query("SELECT incident_log_id, fk_product_id, inl_IM, inl_description, DATE_FORMAT(escalation_date, '%Y-%m-%d') as escalation_date, scaled_to, inl_status, DATE_FORMAT(closing_date, '%Y-%m-%d') as closing_date, inl_comments, user_processed FROM incident_log WHERE incident_log_id = ?", [id]);
            if (incident.length > 0) {
                return res.json(incident[0]);
            }
            else {
                res.status(404).json({ text: "Incidente no encontrado." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.fk_product_id == 0 || req.body.escalation_date == '') {
                res.status(404).json({ message: "Todos los campos son obligatorios." });
            }
            else {
                var sql = yield database_1.default.query('SELECT * FROM incident_log WHERE inl_IM = ? ', [req.body.inl_IM]);
                if (Object.entries(sql).length === 0) {
                    var insert = yield database_1.default.query('INSERT INTO incident_log set ?', [req.body]);
                    if (insert) {
                        res.json({ status: true, msg: "Datos guardatos correctamente." });
                    }
                    else {
                        res.json({ status: false, msg: "No se pudo almacenar los datos." });
                    }
                }
                else {
                    res.status(404).json({ message: "El IM ya existe." });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var sql = yield database_1.default.query('SELECT * FROM incident_log WHERE inl_IM = ? AND  incident_log_id != ?', [req.body.inl_IM, id]);
            console.log(req.body.inl_IM);
            console.log(id);
            if (Object.entries(sql).length === 0) {
                const update = yield database_1.default.query('UPDATE incident_log SET ? WHERE incident_log_id = ?', [req.body, id]);
                if (update) {
                    res.json({ status: true, message: "Datos actualizados correctamente." });
                }
            }
            else {
                res.status(404).json({ message: "El IM ya existe para otro incidente." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM incident_log WHERE incident_log_id = ?', [id]);
            res.json({ status: true, message: "Se ha eliminado correctamente." });
        });
    }
}
const incidentsController = new IncidentsController();
exports.default = incidentsController;
