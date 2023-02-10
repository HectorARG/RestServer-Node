const express = require('express');
const cors = require('cors');

class Server {
    
    constructor(){
        /* Inicializacion de mi aplicacion */
        this.app = express();

        /* Puerto */ 
        this.port = process.env.PORT;

        /* Rutas Controllers */
        this.usuariosPath = '/api/usuarios';

        /* Middlewares */
        this.middlewares();

        /* Rutas de mi aplicacion */
        this.route();
    }

    middlewares(){
        /* CORS */
        this.app.use(cors());

        /* Lectura y parseo del body */
        this.app.use( express.json() );

        /* Directorio Publico */
        this.app.use( express.static('public') )
    }

    route(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('listening on port' , this.port)
        });
    }

}

module.exports = Server;