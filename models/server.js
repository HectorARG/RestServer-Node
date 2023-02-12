const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        /* Inicializacion de mi aplicacion */
        this.app = express();
        /* Puerto */ 
        this.port = process.env.PORT;
        /* Rutas Controllers */
        this.usuariosPath = '/api/usuarios';
        /* Coneccion a Base de Datos */
        this.coneccionDB();
        /* Middlewares */
        this.middlewares();
        /* Rutas de mi aplicacion */
        this.route();
    }

    /* Coneccion a Base de Datos */
    async coneccionDB(){
        await dbConnection();
    }

    middlewares(){
        /* CORS */
        this.app.use(cors());
        /* Lectura y parseo del body */
        this.app.use( express.json() );
        /* Directorio Publico */
        this.app.use( express.static('public') )
    }

    /* Rutas de mi aplicacion */
    route(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    
    /* Aplicacion corriendo en el puerto configurado */
    listen(){
        this.app.listen(this.port , () => {
            console.log('listening on port' , this.port)
        });
    }

}
/* Exportar modulo */
module.exports = Server;