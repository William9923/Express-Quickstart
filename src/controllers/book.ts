import { NextFunction, Request, Response } from "express";
import { MongoBookDAO } from "../daos/Book/MongoBookDAO";
import { IBookDao } from "../daos/book";
import { MockBookDAO } from "../daos/mock/MockDAO.mock";
import HttpError from "../errors/HttpError";

class BookController {

    private BookDAO: IBookDao = new MongoBookDAO();

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const book = await this.BookDAO.getOne(req.params.id);

        if (!book) {
            next(new HttpError(404, "Books Not Found"));
        }

        return res.render("book/booksingle", {
            book: book
        });
    }

    async getAll(req: Request, res: Response ): Promise<void> {
        const books = await this.BookDAO.get();

        return res.render("book/booklist", {
            title: "Book List",
            items: books
        });
    }
}

export default BookController;