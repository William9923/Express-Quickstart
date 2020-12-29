import { Router } from "express";
import GenreController from "../controllers/genre";

const router: Router = Router();

/* GET genre page. */
router.get("/", async (req, res) => await new GenreController().getAll(req, res));

router.get("/:id", async (req, res, next) => await new GenreController().getOne(req, res, next));

export default router;