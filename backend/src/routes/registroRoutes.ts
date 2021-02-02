import express, { Router } from 'express';

import registroController from '../controllers/registroController';

class RegistroRoutes {

    router: Router = Router();

    constructor() {
        this.config();

   }

   config(): void {
        this.router.get('/', registroController.list);
        this.router.get('/:id', registroController.getOne);
        this.router.post('/', registroController.create);
        this.router.put('/:id', registroController.update);
        this.router.delete('/:id', registroController.delete);

   }

}

const registroRoutes = new  RegistroRoutes();
export default registroRoutes.router;