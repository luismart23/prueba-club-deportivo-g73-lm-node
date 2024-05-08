import { readFile, writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const __dirname = import.meta.dirname

const filePath = path.resolve(__dirname, '../data/deportes.json');

const findAll = async () => {
    const data = await readFile(filePath, 'utf8');
    const deportes = JSON.parse(data);
    return deportes;
}

const findOneById = async (uid) => {
    const data = await readFile(filePath, 'utf8');
    const deportes = JSON.parse(data);
    const deporte = deportes.find(item => item.uid === uid);
    return deporte;
}

const create = async (nombre, precio) => {
    const data = await readFile(filePath, 'utf8');
    const deportes = JSON.parse(data);
    const newDeporte = {
        uid: nanoid(),
        nombre,
        precio
    };
    deportes.push(newDeporte);
    await writeFile(filePath, JSON.stringify(deportes));
    return { message: 'Deporte agregado correctamente', deporte: newDeporte };
}

const update = async (uid, nombre, precio) => {
    const data = await readFile(filePath, 'utf8');
    const deportes = JSON.parse(data);
    const deporteIndex = deportes.findIndex(item => item.uid === uid);

    if (deporteIndex === -1) {
        throw new Error('Deporte no encontrado');
    }

    // Actualizar el deporte con el nuevo nombre y precio
    deportes[deporteIndex].nombre = nombre;
    deportes[deporteIndex].precio = precio;

    // Guardar los cambios en el archivo
    await writeFile(filePath, JSON.stringify(deportes));

    // Devolver el deporte actualizado
    return { message: 'Deporte actualizado correctamente', deporte: deportes[deporteIndex] };
}



const remove = async (uid) => {
    const data = await readFile(filePath, 'utf8');
    const deportes = JSON.parse(data);
    const filteredDeportes = deportes.filter(item => item.uid !== uid);
    if (filteredDeportes.length === deportes.length) {
        throw new Error('Deporte no encontrado');
    }
    await writeFile(filePath, JSON.stringify(filteredDeportes));
    return { message: 'Deporte eliminado correctamente', deportes: filteredDeportes };
}


export const Deporte = {
    findAll,
    findOneById,
    create,
    update,
    remove
};
