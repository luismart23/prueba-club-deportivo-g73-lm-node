import express from 'express';
import { engine } from 'express-handlebars';
import router from './routes/deporte.route.js';
import cors from 'cors';
import path from 'path';

const app = express();

// Ruta absoluta del directorio actual
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para los archivos en la carpeta 'public'
app.use(express.static(__dirname + '/public'));
app.use('/assets/js', express.static(__dirname + '/node_modules/axios/dist/'));
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));

// Configuración de Handlebars como motor de plantillas
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.get('/', (req, res) => {
    return res.render('layouts/main');
})


// Rutas de la API para los deportes
app.use('/api/v1/deportes', router); // Cambio aquí: usar el enrutador importado con el nombre correcto

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
});
