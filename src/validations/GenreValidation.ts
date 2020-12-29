import { body, SanitizationChain, sanitizeBody, ValidationChain } from "express-validator";

export const requireId = (): ValidationChain => body("id", "Id required").trim().isLength({ min: 1 });

export const requireName = (): ValidationChain => body("name", "Genre name required").trim().isLength({ min: 1 });

export const sanitize = (): SanitizationChain => sanitizeBody("name").escape();



