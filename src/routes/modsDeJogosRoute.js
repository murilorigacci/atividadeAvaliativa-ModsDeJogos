import express from "express";
import { getAllMods, getById, createMod, deleteMod  } from "../controllers/modsDeJogosController.js";

const router = express.Router();

router.get("/", getAllMods);
router.get("/:id", getById);
router.post("/", createMod);
router.delete("/:id", deleteMod);

export default router;