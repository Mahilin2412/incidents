import {Request, Response} from 'express';
import pool from '../database';

class ProductsController {

    public async list (req: Request, res: Response) {
        const products = await pool.query('SELECT * FROM products');
        res.json(products);
    }

    public async getOne (req: Request, res: Response){
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE product_id = ?',[id]);
        if (product.length > 0) {
            return res.json(product[0]);
        }else{
            res.status(404).json({message: "Producto no encontrado."});
        }
    }

    public async create (req: Request, res: Response){
        if (req.body.name_product == '') {
            res.status(404).json({message: "Todos los campos son obligatorios."});
        } else {
            const sql = await pool.query('SELECT * FROM products WHERE acronym_product = ?',[req.body.acronym_product]);
            if (Object.entries(sql).length === 0) {
                const insert = await pool.query('INSERT INTO products SET ?', [req.body]);
                if (insert) {
                    res.json({status: true, msg : "Datos guardatos correctamente."});
                }else {
                    res.json({status: false, msg : "No se pudo almacenar los datos."});
                }
            } else {
                res.status(404).json({message: "El acronimo ya existe para otro producto."})
            }
        }

    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        const sql = await pool.query('SELECT * FROM products WHERE acronym_product = ? AND product_id != ?',[req.body.acronym_product,id]);
        if (Object.entries(sql).length === 0) {
            const update = await pool.query('UPDATE products SET ? WHERE product_id = ?',[req.body,id]);
            if (update) {
                res.json({status: true, message : "Datos actualizados correctamente."});
            }
        } else {
            res.status(404).json({message: "El acronimo ya existe para otro producto."})
        }
    }

    public async delete (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE product_id = ?', [id]);
        res.json({status: true, message: "Se ha eliminado correctamente."});
    }

}

export const productsController = new ProductsController();