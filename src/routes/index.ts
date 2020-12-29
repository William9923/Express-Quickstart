import { Router } from "express";
import home from "../controllers";

const router: Router = Router();

/* GET home page. */
router.get("/", async (req, res) => await home(req, res));

export default router;