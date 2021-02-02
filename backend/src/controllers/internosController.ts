import {Request, Response } from 'express';

import pool from '../database';

class InternoController {

    public async list (req: Request, res: Response) {
      const registros = await pool.query("SELECT id_internos, name_pro, Date_format(fecha,'%Y-%m-%d T %h:%i') AS fecha,incidente,name_product,origen,tramito FROM internos JOIN reporta ON pkfk_id_reporta =  pro_id JOIN products ON pkfk_id_producto = product_id");
      res.json(registros);
}

    public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const registro = await pool.query("SELECT id_internos, pkfk_id_reporta, Date_format(fecha,'%Y-%m-%dT%h:%i') AS fecha,incidente,pkfk_id_producto,origen,tramito FROM internos JOIN reporta ON pkfk_id_reporta =  pro_id JOIN products ON pkfk_id_producto = product_id WHERE id_internos = ?", [id]);
    if (registro.length > 0) {
        return res.json(registro[0]);
    }
    res.status(404).json({text: 'El registro no existe'});
}
    public async create (req: Request, res: Response): Promise<void> {
        const insert = await pool.query('INSERT INTO internos set ?',[req.body]);
        if (insert) {
            res.json({status: true, msg : "Datos guardatos correctamente."});
        }
        else{
            res.json({status: false, msg : "No se pudo almacenar los datos."});
        }
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const actualizar = await pool.query('UPDATE internos set ? WHERE id_internos = ?', [req.body, id]);
        if (actualizar) {
            res.json({status: true, message : "Datos actualizados correctamente."});
        }
        else{
            res.json({status: false, message : "No se pudo actualizar los datos."});
        }
    }
    
    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM internos WHERE id_internos = ?', [id]);
        res.json({message: 'El registro fue eliminado'});
}


}

const internoController = new InternoController();
export default internoController;