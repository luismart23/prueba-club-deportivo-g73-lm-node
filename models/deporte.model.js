import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const filePath = path.join(__dirname, "../data/deportes.json")

const findAll = async () => {
    const data = await readFile(filePath, 'utf8')
    const deportes = JSON.parse(data)
    return deportes
}

const findOneById = async (uid) => {
    const data = await readFile(filePath, 'utf8')
    const deportes = JSON.parse(data)
    const deporte = deportes.find(item => item.uid === uid)
    return deporte
}

const create = async (nombre, precio) => {
    const data = await readFile(filePath, 'utf8')
    const deportes = JSON.parse(data)
    const newDeporte = {
        nombre,
        precio,
        uid: nanoid()
    }
    deportes.push(newDeporte)
    await writeFile(filePath, JSON.stringify(deportes))
    return newDeporte
}

const update = async (uid, nombre, precio) => {
    const data = await readFile(filePath, 'utf8')
    const deportes = JSON.parse(data)
    const deporte = deportes.find(item => item.uid === uid)
    deporte.nombre = nombre
    deporte.precio = precio
    await writeFile(filePath, JSON.stringify(deportes))
    return deporte
}

const remove = async (uid) => {
    const data = await readFile(filePath, 'utf8')
    const deportes = JSON.parse(data)
    const filteredDeportes = deportes.filter(item => item.uid !== uid)
    await writeFile(filePath, JSON.stringify(filteredDeportes))
    return filteredDeportes
}

export const Deporte = {
    findAll,
    findOneById,
    create,
    update,
    remove
}
