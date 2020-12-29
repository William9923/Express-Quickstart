import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import Genre, { IGenre } from "../../models/Genre";
import { IBookDao } from "../../daos/book";
import { IGenreDao } from "../../daos/genre";
import { MockBookDAO, MockGenreDAO } from "../../daos/mock/MockDAO.mock";
import JSONHttpError from "../../errors/JSONHttpError";


import { generate } from "../../shared/util";


class GenreApiController {

    private BookDAO: IBookDao = new MockBookDAO();
    private GenreDAO: IGenreDao = new MockGenreDAO();

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const [genre, books] = await Promise.all(
            [
                this.GenreDAO.getOne(req.params.id),
                (await this.BookDAO.get()).filter(elem => !!elem.genres.find(genre => genre.getId() === req.params.id))
            ]
        );

        if (!genre) {
            return next(new JSONHttpError(404, "Genre Not Found"));
        }

        return res.render("genre/genresingle", {
            genre: genre,
            books: books
        });
    }

    async getAll(req: Request, res: Response): Promise<Response<IGenre[]>> {
        const genres: IGenre[] = await this.GenreDAO.get();
        return res.json(genres);
    }

    async create(req: Request, res: Response): Promise<Response<void>> {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw new JSONHttpError(400, "Bad Request! Validation Failed!" + error.array());
        }

        // change into repository pattern
        await this.GenreDAO.create(new Genre(generate(), req.body.name));
        return res.status(201).send();
    }

    async update(req: Request, res: Response): Promise<Response<void>> {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw new JSONHttpError(400, "Bad Request! Validation Failed!" + error.array());
        }

        let genre = await this.GenreDAO.getOne(req.params.id);

        if (!genre) {
            throw new JSONHttpError(404, "Genre Not Found");
        }

        genre = new Genre(genre.getId(), req.body.name);
        await this.GenreDAO.update(genre);
        return res.status(204).send();
    }

    // delete
    async delete(req: Request, res: Response): Promise<Response<void>> {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw new JSONHttpError(400, "Bad Request! Validation Failed!" + error.array());
        }

        const genre = await this.GenreDAO.getOne(req.params.id);

        if (!genre) {
            throw new JSONHttpError(404, "Genre Not Found");
        }

        await this.GenreDAO.delete(genre.getId());
        return res.status(204).send();
    }
}

export default GenreApiController;