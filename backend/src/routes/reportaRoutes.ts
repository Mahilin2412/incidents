import express, { Router } from 'express';

import reportaController from '../controllers/reportaController';

class ReportaRoutes {

    router: Router = Router();

    constructor() {
        this.config();

   }

   config(): void {
        this.router.get('/', reportaController.list);
        this.router.get('/:idd', reportaController.getOne);
        this.router.post('/', reportaController.create);
        this.router.put('/:idd', reportaController.update);
        this.router.delete('/:idd', reportaController.delete);

   }

}

const reportaRoutes = new  ReportaRoutes();
export default reportaRoutes.router;