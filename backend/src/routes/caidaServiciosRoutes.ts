import { Router } from 'express';
import  caidaServController from '../controllers/caidaServController';

class CaidaServiciosRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/select', caidaServController.list_incident);
        this.router.get('/', caidaServController.list);
        this.router.get('/:Id_service', caidaServController.getOne);
        this.router.post('/', caidaServController.create);
        this.router.put('/:Id_service', caidaServController.update);
        this.router.delete('/:Id_service', caidaServController.delete);
        
    }
}
const caidaServiciosRoutes = new CaidaServiciosRoutes();
export default caidaServiciosRoutes.router;