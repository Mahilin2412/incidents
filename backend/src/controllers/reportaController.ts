import {Request, Response } from 'express';

import pool from '../database';

class ReportaController {

    public async list (req: Request, res: Response) {
      const reportas = await pool.query("SELECT pro_id, name_pro, acronym_product, Date_format(created_at, '%Y-%m-%d T %h:%i') AS created_at FROM reporta");
      res.json(reportas);
}

    public async getOne(req: Request, res: Response): Promise<any> {
    const { idd } = req.params;
    const reporta = await pool.query("SELECT pro_id, name_pro, acronym_product, Date_format(created_at, '%Y-%m-%dT%h:%i') AS created_at FROM reporta = ?", [idd]);
    if (reporta.length > 0) {
        return res.json(reporta[0]);
    }
    res.status(404).json({text: 'El registro no existe'});
}
    public async create (req: Request, res: Response): Promise<void> {
        const insert = await pool.query('INSERT INTO reporta set ?',[req.body]);
        if (insert) {
            res.json({status: true, msg : "Datos guardatos correctamente."});
        }
        else{
            res.json({status: false, msg : "No se pudo almacenar los datos."});
        }
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { idd } = req.params;
        const actualizar = await pool.query('UPDATE reporta set ? WHERE pro_id = ?', [req.body, idd]);
        if (actualizar) {
            res.json({status: true, message : "Datos actualizados correctamente."});
        }
        else{
            res.json({status: false, message : "No se pudo actualizar los datos."});
        }
    }
    
    public async delete (req: Request, res: Response): Promise<void> {
        const { idd } = req.params;
        await pool.query('DELETE FROM reporta WHERE pro_id = ?', [idd]);
        res.json({message: 'El registro fue eliminado'});
}


}

const reportaController = new ReportaController();
export default reportaController;