const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extencionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ], carpeta = '' ) => {

    return new Promise((resolve, reject) => {
      // console.log(files)
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[ nombreCortado.length - 1 ];
    
        //Validar Extenciones
        if( !extencionesValidas.includes(extencion) ){
            return reject('Archivo no valido');
        }
    
        const nombreTemporal = uuidv4() + '.' + extencion ;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta , nombreTemporal );
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject(err);
          }
      
          resolve(nombreTemporal);
        });
    });

    

}

module.exports = {
    subirArchivo
}