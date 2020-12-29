import { NextFunction, Request, Response, Router } from "express";
import GenreApiController from "../../controllers/api/genre";
import { requireId, requireName, sanitize } from "../../validations/GenreValidation";

const router: Router = Router();
const controller: GenreApiController = new GenreApiController();

router.get("/", async (req, res) => {
    await controller.getAll(req, res);
});


router.get("/:id", async (req, res, next) => await controller.getOne(req, res, next));

router.post("/",
    [
        requireName(),
        sanitize()
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller.create(req, res);
        } catch (err) {
            next(err);
        }
    }
);

router.put("/",
    [
        requireId(),
        requireName(),
        sanitize()
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller.update(req, res);
        } catch (err) {
            next(err);
        }
    });

router.delete("/",
    [
        requireId(),
        sanitize()
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller.delete(req, res);
        } catch (err) {
            next(err);
        }
    }
);

export default router;