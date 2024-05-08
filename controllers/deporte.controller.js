import { Deporte } from "../models/deporte.model.js"

export const getAllDeportes = async (req, res) => {
    try {
        const deportes = await Deporte.findAll()
        return res.json(deportes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const getDeporte = async (req, res) => {
    const { uid } = req.params
    const deporte = await Deporte.findOneById(uid)
    return res.json(deporte)
}

export const createDeporte = async (req, res) => {
    const { nombre, precio } = req.body
    const newDeporte = await Deporte.create(nombre, precio)
    return res.json(newDeporte)
}

export const updateDeporte = async (req, res) => {
    const { uid } = req.params
    const { nombre, precio } = req.body
    const deporte = await Deporte.update(uid, nombre, precio)
    return res.json(deporte)
}

export const removeDeporte = async (req, res) => {
    const { uid } = req.params
    const filteredDeportes = await Deporte.remove(uid)
    return res.json(filteredDeportes)
}
