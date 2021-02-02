import { Request, Response} from 'express';
import pool from '../database';

class OperationController{
    public async list (req: Request, res: Response) {
        const operations = await pool.query('SELECT * FROM operations');
        res.json(operations);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { Id_operation } = req.params;
        const operations = await pool.query('SELECT * FROM operations WHERE Id_operation = ?', [Id_operation]);
        if (operations.length > 0){
            return res.json(operations[0]);
        }
        res.status(404).json({text: "The operations doesn't exists"});
        console.log(operations);
        res.json({text: 'operation consulting'});
    }
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO operations set ?', [req.body]);
        res.json({message: 'Save operation'});
    }
    public async update (req: Request, res: Response): Promise<void>  {
        const { Id_operation } = req.params;
        await pool.query('UPDATE operations set ? WHERE Id_operation = ?', [req.body, Id_operation]);
        res.json({message: 'The operation was update'});
    }
    public async delete (req: Request, res: Response):Promise<void> {
        const { Id_operation } = req.params;
        await pool.query('DELETE FROM operations WHERE Id_operation = ?', [Id_operation]);
        res.json({message: 'The operation was delete'});
    }
}

const operationController = new OperationController();
export default operationController;