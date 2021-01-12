import { NextFunction, Request, Response } from "express";
import { IBook } from "../../models/Book";
import { IBookDao } from "../../daos/book";
import { MockBookDAO } from "../../daos/mock/MockDAO.mock";
import JSONHttpError from "../../errors/JSONHttpError";
import { MongoBookDAO } from "../../daos/Book/MongoBookDAO";

class BookApiController {

    private BookDAO: IBookDao = new MongoBookDAO();

    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response<IBook>> {
        const book = await this.BookDAO.getOne(req.params.id);

        if (!book) {
            next(new JSONHttpError(404, "Books Not Found"));
        }

        return res.json(book);
    }

    async getAll(req: Request, res: Response): Promise<Response<IBook[]>> {
        const books = await this.BookDAO.get();
        return res.json(books);
    }
}

export default BookApiController;