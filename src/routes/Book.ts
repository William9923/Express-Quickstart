import { Router } from "express";
import BookController from "../controllers/book";

const router: Router = Router();

/* GET book page. */
router.get("/", async (req, res, next) => await new BookController().getAll(req, res));

router.get("/:id", async (req, res, next) => await new BookController().getOne(req, res, next));

export default router;