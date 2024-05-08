import express from 'express';
import router from './routes/deporte.route.js';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();

// Ruta absoluta
const __dirname = import.meta.dirname

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para los archivos en la carpeta 'public'
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Ruta para renderizar la página HTML de deportes
app.get('/', (req, res) => {
    // Ruta absoluta del archivo HTML
    const htmlFilePath = path.join(publicPath, 'club.deportivo.html');

    // Verificar si el archivo HTML existe
    fs.access(htmlFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('El archivo HTML no existe:', err);
            res.status(404).send('No se encontró el archivo HTML');
        } else {
            res.sendFile(htmlFilePath, (err) => {
                if (err) {
                    console.error('Error al enviar el archivo HTML:', err);
                    res.status(500).send('Error interno del servidor');
                } else {
                    console.log('Archivo HTML enviado correctamente');
                }
            });
        }
    });
});

// Rutas de la API para los deportes
app.use('/api/v1/deportes', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
});


