import { Deporte } from "../models/deporte.model.js";

export const getAllDeportes = async (req, res) => {
    try {
        const deportes = await Deporte.findAll();
        return res.json(deportes);
    } catch (error) {
        console.error('Error al obtener todos los deportes:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};

export const getDeporte = async (req, res) => {
    try {
        const { uid } = req.params;
        const deporte = await Deporte.findOneById(uid);
        if (!deporte) {
            return res.status(404).json({ ok: false, error: 'Deporte no encontrado' });
        }
        return res.json(deporte);
    } catch (error) {
        console.error('Error al obtener el deporte por ID:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};

export const createDeporte = async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const newDeporte = await Deporte.create(nombre, precio);
        return res.json(newDeporte);
    } catch (error) {
        console.error('Error al crear un nuevo deporte:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};

export const updateDeporte = async (req, res) => {
    try {
        const { uid } = req.params;
        const { nombre, precio } = req.body;
        const deporteExistente = await Deporte.findOneById(uid);

        if (!deporteExistente) {
            return res.status(404).json({ ok: false, error: 'Deporte no encontrado' });
        }

        const deporteActualizado = await Deporte.update(uid, nombre, precio);
        return res.json(deporteActualizado);
    } catch (error) {
        console.error('Error al actualizar el deporte:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};


export const removeDeporte = async (req, res) => {
    try {
        const { uid } = req.params;
        const filteredDeportes = await Deporte.remove(uid);
        return res.json(filteredDeportes);
    } catch (error) {
        console.error('Error al eliminar el deporte:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};

