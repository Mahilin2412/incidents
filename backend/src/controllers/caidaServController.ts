import { Request, Response} from 'express';
import pool from '../database';

class CaidaServiciosController{
    public async list (req: Request, res: Response) {
        const services = await pool.query("SELECT services.Id_service, incident_log.inl_IM, services.fallo, operations.Initials, Date_format(services.start_dates,'%Y-%m-%dT%h:%i') AS start_dates, Date_format(services.end_date,'%Y-%m-%dT%h:%i') AS end_date, TIMEDIFF(services.end_date, services.start_dates) AS duracion, services.comments FROM operations INNER JOIN services ON operations.Id_operation = services.Id_operation INNER JOIN incident_log ON incident_log.incident_log_id = services.incident_log_id");
        res.json(services);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { Id_service } = req.params;
        const services = await pool.query("SELECT services.Id_service, incident_log.incident_log_id, services.fallo, operations.Id_operation, Date_format(services.start_dates,'%Y-%m-%dT%h:%i') AS start_dates, Date_format(services.end_date,'%Y-%m-%dT%h:%i') AS end_date, services.comments FROM operations INNER JOIN services ON operations.Id_operation = services.Id_operation INNER JOIN incident_log ON incident_log.incident_log_id = services.incident_log_id WHERE services.Id_service = ?", [Id_service]);
        if (services.length > 0){
            return res.json(services[0]);
        }
        res.status(404).json({text: "The service doesn't exists"});
        console.log(services);
        res.json({text: 'service consulting'});
    }
    public async create (req: Request, res: Response): Promise<void> {
        if(req.body.incident_log_id == 0 || req.body.Id_operation == 0){
            res.status(404).json({message: "Todos los campos son obligatorios."});
        }else {
            const insert = await pool.query('INSERT INTO services set ?', [req.body]);
            if (insert) {
                res.json({status: true, msg : "Datos guardados correctamente."});
            }
            else{
                res.json({status: false, msg : "No se pudo almacenar los datos."});
            }
        }
        
    }
    public async update (req: Request, res: Response): Promise<void>  {
        const { Id_service } = req.params;
        const update = await pool.query('UPDATE services set ? WHERE Id_service = ?', [req.body, Id_service]);
        if (update) {
            res.json({status: true, message: "Datos actualizados correctamente."});
        }
    }
    public async delete (req: Request, res: Response):Promise<void> {
        const { Id_service } = req.params;
        await pool.query('DELETE FROM services WHERE Id_service = ?', [Id_service]);
        res.json({status: true, message: "Se ha eliminado correctamente."});
    }
    public async list_incident (req: Request, res: Response){
        const datos = await pool.query('SELECT incident_log_id, inl_IM FROM incident_log WHERE inl_status = 1');
        res.json(datos);
    }
}

const caidaServiciosController = new CaidaServiciosController();
export default caidaServiciosController;