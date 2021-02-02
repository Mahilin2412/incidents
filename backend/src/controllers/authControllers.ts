import {Request, Response} from 'express';
import pool from '../database';
import jwt from 'jsonwebtoken';

class AuthController {

    public async create (req: Request, res: Response) {
        const sql = await pool.query("SELECT * FROM users WHERE email = ?",[req.body.email]);
        if (Object.entries(sql).length === 0) {
            const insert = await pool.query('INSERT INTO users SET ?', [req.body]);
            if (insert) {
                res.json({status: true, msg : "Registro exitoso."});
            }else {
                res.json({status: false, msg : "No se pudo registrar."});
            }
        } else {
            res.status(404).json({message: "El email ya existe."});
        }
    }

    public async auth (req: Request, res: Response){
        const JWT_Secret = 'your_secret_key';
        const email = req.body.email;
        const password = req.body.password_user;
        const user = req.body;
        if (email == '' || password == '') {
            res.status(404).json({message: "Todos los campos son obligatorios."});
        } else {
            const sql = await pool.query('SELECT * FROM users WHERE email = ?',[email]);
            if (sql.length > 0) {
                const sql_pas = await pool.query('SELECT * FROM users WHERE password_user = ?',[password]);
                if (sql_pas.length > 0) {
                    const token = jwt.sign(user,JWT_Secret);
                    res.status(200).send({
                        signed_user: sql,
                        token: token
                    })
                } else {
                    res.status(404).json({message: "Correo electronico ó contraseña incorrectos"});
                }
            }else{
                res.status(404).json({message: "Correo electronico ó contraseña incorrectos"});
            }
        }

    }

}

export const authController = new AuthController();