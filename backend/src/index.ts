import express, { Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import incidentsRoutes from './routes/incidentsRoutes';
import productsRoutes from './routes/productsRouter';
import authRoutes from './routes/authRoutes';

//Import Caida de Servicios

import caidaServiciosRoutes from './routes/caidaServiciosRoutes';
import operationRoutes from './routes/operationRoutes';

//Registro Diario

import registroRoutes from './routes/registroRoutes';
import internoRoutes from './routes/internosRoutes';
import reportaRoutes from './routes/reportaRoutes';


class Server {

    public app: Application

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config():void {
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes():void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/incidents',incidentsRoutes);
        this.app.use('/api/products',productsRoutes);
        this.app.use('/api/auth',authRoutes);
    //Caida de Servicios
        this.app.use('/api/services/', caidaServiciosRoutes);
        this.app.use('/api/operations/', operationRoutes);
    //Registro Diario
    this.app.use('/api/registro', registroRoutes);
    this.app.use('/api/interno', internoRoutes);
    this.app.use('/api/reporta', reportaRoutes);
    }

    start():void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();