import jsonfile from "jsonfile";

import Book, { IBook } from "../../models/Book";
import Genre, { IGenre } from "../../models/Genre";

import { IBookDao } from "../book";
import { IGenreDao } from "../genre";

interface MockBook {
    id: string;
    title: string;
    summary: string;
    isbn: string;
    genres: MockGenre[];
}

interface MockGenre {
    id: string;
    name: string;
}

interface IBookDatabase {
    books: MockBook[];
}

interface IGenreDatabase {
    genres: MockGenre[];
}

interface IDatabase<T> {
    openDb: () => Promise<T>;
    save: (db: T) => Promise<void>;
    reset: () => Promise<void>;

}

class DatabaseAccess<T> implements IDatabase<T> {

    protected readonly dbFilePath: string = "src/daos/mock/MockDb";

    public openDb(): Promise<T> {
        return jsonfile.readFile(this.dbFilePath + ".json") as Promise<T>;
    }

    public save(db: T): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath + ".json", db);
    }

    public async reset(): Promise<void> {
        const db = await jsonfile.readFile(this.dbFilePath + ".backup.json");
        return this.save(db);
    }
}

export class MockBookDAO implements IBookDao {

    protected db: IDatabase<IBookDatabase> = new DatabaseAccess<IBookDatabase>();

    async getOne(id: string): Promise<IBook | null> {
        const db: IBookDatabase = await this.db.openDb();
        const book = db.books.find(elem => elem.id == id);
        if (typeof book === "undefined") {
            return null;
        }
        return new Book(book.id, book.title, book.summary, book.isbn, book.genres.map(elem => new Genre(elem.id, elem.name)));
    }
    async get(): Promise<IBook[]> {
        const db: IBookDatabase = await this.db.openDb();
        return db.books.map(elem => new Book(elem.id, elem.title, elem.summary, elem.isbn,
            elem.genres.map(genre => new Genre(genre.id, genre.name))
        )
        );
    }
    async create(book: IBook): Promise<void> {
        const db: IBookDatabase = await this.db.openDb();
        db.books.push({
            id: book.getId(),
            title: book.title,
            genres: book.genres.map(elem => {
                return { id: elem.getId(), name: elem.name };
            }),
            isbn: book.isbn,
            summary: book.summary
        });
        await this.db.save(db);
    }
    async update(book: IBook): Promise<void> {
        const db: IBookDatabase = await this.db.openDb();
        const idx: number = db.books.findIndex(elem => elem.id == book.getId());
        db.books[idx] = {
            id: book.getId(),
            title: book.title,
            genres: book.genres.map(elem => {
                return { id: elem.getId(), name: elem.name };
            }),
            isbn: book.isbn,
            summary: book.summary
        };
        await this.db.save(db);
    }
    async delete(id: string): Promise<void> {
        const db: IBookDatabase = await this.db.openDb();
        const idx: number = db.books.findIndex(elem => elem.id == id);
        db.books.splice(idx, 1);
        await this.db.save(db);
    }

    getDb(): IDatabase<IBookDatabase> {
        return this.db;
    }
}

export class MockGenreDAO implements IGenreDao {

    protected db: IDatabase<IGenreDatabase> = new DatabaseAccess<IGenreDatabase>();

    async getOne(id: string): Promise<IGenre | null> {
        const db: IGenreDatabase = await this.db.openDb();
        const genre = db.genres.find(elem => elem.id === id);
        if (typeof genre === "undefined") {
            return null;
        }
        return new Genre(genre.id, genre.name);
    }
    async get(): Promise<IGenre[]> {
        const db: IGenreDatabase = await this.db.openDb();
        return db.genres.map(elem => new Genre(elem.id, elem.name));
    }
    async create(genre: IGenre): Promise<void> {
        const db: IGenreDatabase = await this.db.openDb();
        db.genres.push({
            id: genre.getId(),
            name: genre.name
        });
        await this.db.save(db);
    }
    async update(genre: IGenre): Promise<void> {
        const db: IGenreDatabase = await this.db.openDb();
        const idx: number = db.genres.findIndex(elem => elem.id == genre.getId());
        db.genres[idx] = {
            id: genre.getId(),
            name: genre.name
        };
        await this.db.save(db);
    }
    async delete(id: string): Promise<void> {
        const db: IGenreDatabase = await this.db.openDb();
        const idx: number = db.genres.findIndex(elem => elem.id == id);
        db.genres.splice(idx, 1);
        await this.db.save(db);
    }
}

