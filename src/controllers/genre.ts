import { NextFunction, Request, Response } from "express";

import { IBook } from "../models/Book";
import { IGenre } from "../models/Genre";
import { IBookDao } from "../daos/book";
import { IGenreDao } from "../daos/genre";
import { MockBookDAO, MockGenreDAO } from "../daos/mock/MockDAO.mock";
import HttpError from "../errors/HttpError";


class GenreController {

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
            return next(new HttpError(404, "Genre Not Found"));
        }

        return res.render("genre/genresingle", {
            genre: genre,
            books: books
        });
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const genres: IGenre[] = await this.GenreDAO.get();

        return res.render("genre/genrelist", {
            title: "Genre List",
            items: genres
        });
    }
}

export default GenreController;