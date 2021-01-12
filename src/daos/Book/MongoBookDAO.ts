import mongoose, { Schema, Document } from "mongoose";
import Genre, { IGenre } from "../../models/Genre";
import Book, { IBook } from "../../models/Book";
import { IBookDao } from "../book";
import { IGenreDao } from "../genre";
import { IGenreMongo, MongoGenreDAO } from "../Genre/MongoGenreDAO";

export interface IBookMongo extends Document, IBook {
    genres: Array<IGenreMongo["_id"]>;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }]
});

BookSchema.loadClass(Book);
const model = mongoose.model<IBookMongo>("Book", BookSchema);

export class MongoBookDAO implements IBookDao {
    async getOne(id: string): Promise<IBook | null> {
        // return await model.findById(id).exec();

        const result: IBookMongo = await model.findById(id).exec();
        const genreDAO: IGenreDao = new MongoGenreDAO();

        const genres: IGenre[] = [];

        for (const genre of result.genres) {
            const res = await genreDAO.getOne(genre);
            genres.push(!!res ? res : new Genre("xx", "Undefined Genre"));
        }

        return new Book(
            result.id,
            result.title,
            result.summary,
            result.isbn,
            genres
        );
    }

    async get(): Promise<IBook[]> {
        const results: IBookMongo[] = await model.find({});
        const genreDAO: IGenreDao = new MongoGenreDAO();
        const books: IBook[] = [];
        for (const res of results) {
            const genres: IGenre[] = [];

            for (const genre of res.genres) {
                const genreDTO = await genreDAO.getOne(genre);
                genres.push(!!genreDTO ? genreDTO : new Genre("xx", "Undefined Genre"));
            }
            books.push(new Book(
                res.id,
                res.title,
                res.summary,
                res.isbn,
                genres
            ));
        }
        return books;
    }

    async create(book: IBook): Promise<void> {
        await model.create({
            _id: book.getId(),
            title: book.title,
            summary: book.summary,
            isbn: book.isbn,
            genres: book.genres.map(elem => elem.getId())
        });
    }

    async update(book: IBook): Promise<void> {
        await model.findByIdAndUpdate(book.getId(), {
            title: book.title,
            summary: book.summary,
            isbn: book.isbn,
            genres: book.genres.map(elem => elem.getId())
        });
    }
    async delete(id: string): Promise<void> {
        await model.findByIdAndDelete(id).exec();
    }
}