import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";

class MascotasModel {
    async create(mascota) {
        if (!mascota || Object.keys(mascota).length === 0)
            throw new Error("No hay datos para crear");
        const col = dbClient.db.collection("mascotas");
        return await col.insertOne(mascota);
    }

    async getAll() {
        const col = dbClient.db.collection("mascotas");
        return await col.find({}).toArray();
    }

    async getOne(id) {
        if (!ObjectId.isValid(id)) return null;
        const col = dbClient.db.collection("mascotas");
        return await col.findOne({ _id: new ObjectId(id) });
    }

    async update(id, data) {
        if (!ObjectId.isValid(id)) throw new Error("ID inválido");
        if (!data || Object.keys(data).length === 0)
            throw new Error("No hay campos para actualizar");
        const col = dbClient.db.collection("mascotas");
        return await col.updateOne({ _id: new ObjectId(id) }, { $set: data });
    }

    async delete(id) {
        if (!ObjectId.isValid(id)) throw new Error("ID inválido");
        const col = dbClient.db.collection("mascotas");
        return await col.deleteOne({ _id: new ObjectId(id) });
    }
}

export default new MascotasModel();

