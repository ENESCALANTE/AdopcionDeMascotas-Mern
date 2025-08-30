import mascotasModel from "../models/mascotas.js";

class MascotasController {
    async create(req, res) {
        try {
            const result = await mascotasModel.create(req.body);
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const data = await mascotasModel.getAll();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await mascotasModel.getOne(id);
            if (!data) return res.status(404).json({ error: "Mascota no encontrada" });
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const result = await mascotasModel.update(id, req.body);
            if (result.matchedCount === 0)
                return res.status(404).json({ error: "Mascota no encontrada" });
            res.status(200).json({ status: "update-ok", modifiedCount: result.modifiedCount });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await mascotasModel.delete(id);
            if (result.deletedCount === 0)
                return res.status(404).json({ error: "Mascota no encontrada" });
            res.status(200).json({ status: "delete-ok" });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}

export default new MascotasController();

