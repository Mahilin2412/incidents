import { Router } from 'express';
import  operationController from '../controllers/operationController';

class OperationRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', operationController.list);
        this.router.get('/:Id_operation', operationController.getOne);
        this.router.post('/', operationController.create);
        this.router.put('/:Id_operation', operationController.update);
        this.router.delete('/:Id_operation', operationController.delete);
    }
}
const operationRoutes = new OperationRoutes();
export default operationRoutes.router;