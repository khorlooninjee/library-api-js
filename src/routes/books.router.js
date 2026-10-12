import { Router } from "express";
import * as c from "../controllers/books.controller.js";

const router = Router();

// "/stats" нь "/:id"-аас ӨМНӨ байх ёстой
router.get("/stats", c.stats);

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", c.create);
router.patch("/:id", c.update);
router.delete("/:id", c.remove);

export default router;