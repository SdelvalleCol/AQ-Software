const express = require('express')
const app = express()
const env = require('dotenv')
const bodyParser = require('body-parser');

//Configuracion de archivos
// Configura el middleware body-parser
app.use(bodyParser.json());
//Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
//Motor de recursos
app.use(express.static(__dirname + '/public/recursos'));

//Configuracion rutas
const routes = require('./backend/Rutes/rt');
app.use('/', routes);

//Arranque servidor
app.listen(5000, () => 
{
    try{
        env.config()
        console.log("ONLINE");
    }catch(e){
        console.log(e);
    }
});


