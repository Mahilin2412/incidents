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
exports.productsController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM products');
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield database_1.default.query('SELECT * FROM products WHERE product_id = ?', [id]);
            if (product.length > 0) {
                return res.json(product[0]);
            }
            else {
                res.status(404).json({ message: "Producto no encontrado." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.name_product == '') {
                res.status(404).json({ message: "Todos los campos son obligatorios." });
            }
            else {
                const sql = yield database_1.default.query('SELECT * FROM products WHERE acronym_product = ?', [req.body.acronym_product]);
                if (Object.entries(sql).length === 0) {
                    const insert = yield database_1.default.query('INSERT INTO products SET ?', [req.body]);
                    if (insert) {
                        res.json({ status: true, msg: "Datos guardatos correctamente." });
                    }
                    else {
                        res.json({ status: false, msg: "No se pudo almacenar los datos." });
                    }
                }
                else {
                    res.status(404).json({ message: "El acronimo ya existe para otro producto." });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sql = yield database_1.default.query('SELECT * FROM products WHERE acronym_product = ? AND product_id != ?', [req.body.acronym_product, id]);
            if (Object.entries(sql).length === 0) {
                const update = yield database_1.default.query('UPDATE products SET ? WHERE product_id = ?', [req.body, id]);
                if (update) {
                    res.json({ status: true, message: "Datos actualizados correctamente." });
                }
            }
            else {
                res.status(404).json({ message: "El acronimo ya existe para otro producto." });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM products WHERE product_id = ?', [id]);
            res.json({ status: true, message: "Se ha eliminado correctamente." });
        });
    }
}
exports.productsController = new ProductsController();
