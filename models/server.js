const express = require('express');
const cors = require('cors');

class Server {
    
    constructor(){
        /* Inicializacion de mi aplicacion */
        this.app = express();

        /* Puerto */ 
        this.port = process.env.PORT;

        /* Middlewares */
        this.middlewares();

        /* Rutas de mi aplicacion */
        this.route();
    }

    middlewares(){
        /* CORS */
        this.app.use(cors());
        /* Directorio Publico */
        this.app.use( express.static('public') )
    }

    route(){
        this.app.get('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'Get del API'
            })
        });

        this.app.post('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'Post del API'
            })
        });

        this.app.put('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'Put del API'
            })
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'Delete del API'
            })
        });


    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('listening on port' , this.port)
        });
    }

}

module.exports = Server;