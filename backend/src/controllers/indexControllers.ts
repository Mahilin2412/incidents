import {Request, Response} from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.json({text: 'Api corriendo'})
    }

}

export const indexController = new IndexController();