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
class CaidaServiciosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield database_1.default.query("SELECT services.Id_service, incident_log.inl_IM, services.fallo, operations.Initials, Date_format(services.start_dates,'%Y-%m-%dT%h:%i') AS start_dates, Date_format(services.end_date,'%Y-%m-%dT%h:%i') AS end_date, TIMEDIFF(services.end_date, services.start_dates) AS duracion, services.comments FROM operations INNER JOIN services ON operations.Id_operation = services.Id_operation INNER JOIN incident_log ON incident_log.incident_log_id = services.incident_log_id");
            res.json(services);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_service } = req.params;
            const services = yield database_1.default.query("SELECT services.Id_service, incident_log.incident_log_id, services.fallo, operations.Id_operation, Date_format(services.start_dates,'%Y-%m-%dT%h:%i') AS start_dates, Date_format(services.end_date,'%Y-%m-%dT%h:%i') AS end_date, services.comments FROM operations INNER JOIN services ON operations.Id_operation = services.Id_operation INNER JOIN incident_log ON incident_log.incident_log_id = services.incident_log_id WHERE services.Id_service = ?", [Id_service]);
            if (services.length > 0) {
                return res.json(services[0]);
            }
            res.status(404).json({ text: "The service doesn't exists" });
            console.log(services);
            res.json({ text: 'service consulting' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.incident_log_id == 0 || req.body.Id_operation == 0) {
                res.status(404).json({ message: "Todos los campos son obligatorios." });
            }
            else {
                const insert = yield database_1.default.query('INSERT INTO services set ?', [req.body]);
                if (insert) {
                    res.json({ status: true, msg: "Datos guardados correctamente." });
                }
                else {
                    res.json({ status: false, msg: "No se pudo almacenar los datos." });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_service } = req.params;
            const update = yield database_1.default.query('UPDATE services set ? WHERE Id_service = ?', [req.body, Id_service]);
            if (update) {
                res.json({ status: true, message: "Datos actualizados correctamente." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_service } = req.params;
            yield database_1.default.query('DELETE FROM services WHERE Id_service = ?', [Id_service]);
            res.json({ status: true, message: "Se ha eliminado correctamente." });
        });
    }
    list_incident(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield database_1.default.query('SELECT incident_log_id, inl_IM FROM incident_log WHERE inl_status = 1');
            res.json(datos);
        });
    }
}
const caidaServiciosController = new CaidaServiciosController();
exports.default = caidaServiciosController;
