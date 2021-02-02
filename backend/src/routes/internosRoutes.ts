
import express, { Router } from 'express';

import internoController from '../controllers/internosController';

class InternoRoutes {

    router: Router = Router();

    constructor() {
        this.config();

   }

   config(): void {
        this.router.get('/', internoController.list);
        this.router.get('/:id', internoController.getOne);
        this.router.post('/', internoController.create);
        this.router.put('/:id', internoController.update);
        this.router.delete('/:id', internoController.delete);

   }

}

const internoRoutes = new  InternoRoutes();
export default internoRoutes.router;