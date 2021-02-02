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
class OperationController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operations = yield database_1.default.query('SELECT * FROM operations');
            res.json(operations);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_operation } = req.params;
            const operations = yield database_1.default.query('SELECT * FROM operations WHERE Id_operation = ?', [Id_operation]);
            if (operations.length > 0) {
                return res.json(operations[0]);
            }
            res.status(404).json({ text: "The operations doesn't exists" });
            console.log(operations);
            res.json({ text: 'operation consulting' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO operations set ?', [req.body]);
            res.json({ message: 'Save operation' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_operation } = req.params;
            yield database_1.default.query('UPDATE operations set ? WHERE Id_operation = ?', [req.body, Id_operation]);
            res.json({ message: 'The operation was update' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_operation } = req.params;
            yield database_1.default.query('DELETE FROM operations WHERE Id_operation = ?', [Id_operation]);
            res.json({ message: 'The operation was delete' });
        });
    }
}
const operationController = new OperationController();
exports.default = operationController;
