import { Router } from 'express';

import { authController } from '../controllers/authControllers'

class AuthRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        this.router.post('/',authController.create);
        this.router.post('/authentication',authController.auth);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;