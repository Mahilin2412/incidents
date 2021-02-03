import express, { Application } from 'express';
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
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "ASIARPFMFNNRSC3X3757",
    secretAccessKey: "Ers9CJMWMyI0svFgzDpDGPMcC14lZa1ctpQDJur1",
    sessionToken:"FwoGZXIvYXdzEAwaDHlaxIZ96RYvoNlKkCLIAc43FFXYBk5/fsbK5D8m31vfvnuAvHb/zRr6DqRDGsLXu9UX8rS0hI5cAT3pnENlE9Ul99k5EHkqNt2aQw49zu0lYL00GWx+bloAYNyeNioJGjx6f7926foJmhT9X7zE0ECmdqiw8ZVuGqVNtTB7tz6uzJ+aeeWMejsZOV+qEa7r0nkZt4JoqtzqmnWTEhbHENAgOQCGe7bx6D+OJ5i0Mdns4l/FtgXCVXeHUa/8ei94MW8ZIUg0XrNiX7H0y0ZekOge/vokJte2KJOc6IAGMi3WqtKKTFQ68pn3XJCuqOyb6lbAzgzdG5HTrhrg6fcOSekTfdbI/CCqdE1/In0="
});

const server = new Server();
server.start();