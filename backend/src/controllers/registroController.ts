import {Request, Response } from 'express';

import pool from '../database';

class RegistroController {

    public async list (req: Request, res: Response) {
      const registros = await pool.query("SELECT id, Date_format(fecha, '%Y-%m-%d T %h:%i') AS fecha, inl_IM, relacionado, usuario, name_product FROM incidente JOIN incident_log ON fk_incidente = incident_log_id JOIN products ON pkfk_id_producto = product_id");
      res.json(registros);
}

    public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const registro = await pool.query("SELECT id, Date_format(fecha, '%Y-%m-%dT%h:%i') AS fecha, fk_incidente, relacionado, usuario, pkfk_id_producto FROM incidente JOIN incident_log ON fk_incidente = incident_log_id JOIN products ON pkfk_id_producto = product_id = ?", [id]);
    if (registro.length > 0) {
        return res.json(registro[0]);
    }
    res.status(404).json({text: 'El registro no existe'});
}
    public async create (req: Request, res: Response): Promise<void> {
        const insert = await pool.query('INSERT INTO incidente set ?',[req.body]);
        if (insert) {
            res.json({status: true, msg : "Datos guardatos correctamente."});
        }
        else{
            res.json({status: false, msg : "No se pudo almacenar los datos."});
        }
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const actualizar = await pool.query('UPDATE incidente set ? WHERE id = ?', [req.body, id]);
        if (actualizar) {
            res.json({status: true, message : "Datos actualizados correctamente."});
        }
        else{
            res.json({status: false, message : "No se pudo actualizar los datos."});
        }
    }
    
    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM incidente WHERE id = ?', [id]);
        res.json({message: 'El registro fue eliminado'});
}


}

const registroController = new RegistroController();
export default registroController;