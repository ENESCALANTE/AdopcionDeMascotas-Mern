import express from "express";
import mascotaController from "../controllers/mascotas.js";

const router = express.Router();

router.post("/", mascotaController.create);
router.get("/", mascotaController.getAll);
router.get("/:id", mascotaController.getOne);
router.put("/:id", mascotaController.update);
router.delete("/:id", mascotaController.delete);

export default router;
