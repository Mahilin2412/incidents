import {Request, Response} from 'express';

import pool from '../database';

class IncidentsController {

    public async list_products (req: Request, res: Response){
        const products = await pool.query("SELECT * FROM products");
        res.setHeader('Content-Type','application/json; charset=UTF-8');
        res.json(products);
    }

    public async list (req: Request, res: Response) {
        const products = await pool.query("SELECT inl.incident_log_id, p.acronym_product, inl.inl_IM, inl.inl_description, DATE_FORMAT(inl.escalation_date, '%d-%m-%Y') as escalation_date, inl.scaled_to, inl.inl_status, DATE_FORMAT(inl.closing_date, '%d-%m-%Y') as closing_date, inl.inl_comments, TIMESTAMPDIFF(DAY, inl.escalation_date, CURDATE()) as scalation_time, IF(inl.closing_date IS NULL OR incident_log_id = incident_log_id, TIMESTAMPDIFF(DAY, inl.escalation_date, CURDATE()), TIMESTAMPDIFF(DAY, inl.escalation_date, inl.closing_date)) as scalation_times, inl.user_processed FROM incident_log inl INNER JOIN products p ON inl.fk_product_id = p.product_id");
        res.json(products);
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const incident = await pool.query("SELECT incident_log_id, fk_product_id, inl_IM, inl_description, DATE_FORMAT(escalation_date, '%Y-%m-%d') as escalation_date, scaled_to, inl_status, DATE_FORMAT(closing_date, '%Y-%m-%d') as closing_date, inl_comments, user_processed FROM incident_log WHERE incident_log_id = ?",[id]);
        if (incident.length > 0) {
            return res.json(incident[0]);
        }else{
            res.status(404).json({text: "Incidente no encontrado."});
        }
    }

    public async create (req: Request, res: Response): Promise<void> {
        if (req.body.fk_product_id == 0 || req.body.escalation_date == '') {
            res.status(404).json({message: "Todos los campos son obligatorios."});
        } else {
            var sql = await pool.query('SELECT * FROM incident_log WHERE inl_IM = ? ' , [req.body.inl_IM]); 
            if(Object.entries(sql).length === 0){
                var insert = await pool.query('INSERT INTO incident_log set ?', [req.body]);
                if (insert) {
                    res.json({status: true, msg : "Datos guardatos correctamente."});
                }
                else{
                    res.json({status: false, msg : "No se pudo almacenar los datos."});
                }
            }else{
                res.status(404).json({message: "El IM ya existe."});
            } 
        }
        
    }

    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        var sql = await pool.query('SELECT * FROM incident_log WHERE inl_IM = ? AND  incident_log_id != ?' , [req.body.inl_IM, id]);
        console.log(req.body.inl_IM);
        console.log(id);
        if (Object.entries(sql).length === 0) {
            const update = await pool.query('UPDATE incident_log SET ? WHERE incident_log_id = ?',[req.body,id]);
            if (update) {
                res.json({status: true, message: "Datos actualizados correctamente."});
            }
        }else{
            res.status(404).json({message: "El IM ya existe para otro incidente."});
        }
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM incident_log WHERE incident_log_id = ?', [id]);
        res.json({status: true, message: "Se ha eliminado correctamente."});
    }
}

const incidentsController = new IncidentsController();
export default incidentsController;