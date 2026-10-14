import { Router } from "express";
import * as c from "../controllers/books.controller.js";

const router = Router();

// ТОДОРХОЙ хаягууд дээр, хувьсагчтай хаяг (/:id) доор
router.get("/stats", c.stats);
router.get("/search", c.search);

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", c.create);
router.patch("/:id", c.update);
router.delete("/:id", c.remove);

export default router;