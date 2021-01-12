import { Request, Response, NextFunction } from "express";
import { IGenreDao } from "../daos/genre";
import { IBookDao } from "../daos/book";
import { MockBookDAO, MockGenreDAO } from "../daos/mock/MockDAO.mock";
import { MongoBookDAO } from "../daos/Book/MongoBookDAO";
import { MongoGenreDAO } from "../daos/Genre/MongoGenreDAO";

export default async (req: Request, res: Response): Promise<void> => {
    // change DAO implementation here
    const bookDao: IBookDao = new MongoBookDAO();
    const genreDao: IGenreDao = new MongoGenreDAO();

    const response = {
        title: "Strict Library",
        data: {},
        error: null
    };

    try {
        const [books, genres] = await Promise.all([bookDao.get(), genreDao.get()]);
        response["data"] = {
            bookCount: books.length,
            genreCount: genres.length
        };
    } catch (err) {
        response["error"] = err;
    }

    return res.render("index", response);
};