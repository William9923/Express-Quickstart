import { Router } from "express";
import BookApiController from "../../controllers/api/book";

const router: Router = Router();

/* GET home page. */
router.get("/", async (req, res, next) => await new BookApiController().getAll(req, res));

router.get("/:id", async (req, res, next) => await new BookApiController().getOne(req, res, next));

export default router;