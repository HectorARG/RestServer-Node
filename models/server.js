const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        /* Inicializacion de mi aplicacion */
        this.app = express();
        /* Puerto */ 
        this.port = process.env.PORT;
        /* Rutas Controllers */
        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categoria: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        }
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
        this.app.use( express.static('public') );
        /* Manejo de la carga de archivos */
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            /* Para crear los directorios no se recomienda hacerlo *Para fines educativos* */
            createParentPath: true
        }));
    }

    /* Rutas de mi aplicacion */
    route(){
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.categoria , require('../routes/categoria'));
        this.app.use(this.path.productos , require('../routes/productos'));
        this.app.use(this.path.uploads, require('../routes/uploads'));
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
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