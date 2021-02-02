import { Router } from 'express';

import incidentsController from '../controllers/incidentsControllers';

class IncidentsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        this.router.get('/products',incidentsController.list_products);
        this.router.get('/',incidentsController.list);
        this.router.get('/:id',incidentsController.getOne);
        this.router.post('/',incidentsController.create);
        this.router.put('/:id',incidentsController.update);
        this.router.delete('/:id',incidentsController.delete);
    }
}

const incidentsRoutes = new IncidentsRoutes();
export default incidentsRoutes.router;