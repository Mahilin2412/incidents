"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const incidentsRoutes_1 = __importDefault(require("./routes/incidentsRoutes"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
//Import Caida de Servicios
const caidaServiciosRoutes_1 = __importDefault(require("./routes/caidaServiciosRoutes"));
const operationRoutes_1 = __importDefault(require("./routes/operationRoutes"));
//Registro Diario
const registroRoutes_1 = __importDefault(require("./routes/registroRoutes"));
const internosRoutes_1 = __importDefault(require("./routes/internosRoutes"));
const reportaRoutes_1 = __importDefault(require("./routes/reportaRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/incidents', incidentsRoutes_1.default);
        this.app.use('/api/products', productsRouter_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
        //Caida de Servicios
        this.app.use('/api/services/', caidaServiciosRoutes_1.default);
        this.app.use('/api/operations/', operationRoutes_1.default);
        //Registro Diario
        this.app.use('/api/registro', registroRoutes_1.default);
        this.app.use('/api/interno', internosRoutes_1.default);
        this.app.use('/api/reporta', reportaRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
