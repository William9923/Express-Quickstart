import { IBook } from "../models/Book";

export interface IBookDao {
    getOne: (id: string) => Promise<IBook | null>;
    get: () => Promise<IBook[]>;
    create: (book: IBook) => Promise<void>;
    update: (book: IBook) => Promise<void>;
    delete: (id: string) => Promise<void>;
}
