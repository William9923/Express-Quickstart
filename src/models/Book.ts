import { IGenre } from "./Genre";

export interface IBook {
    title: string;
    summary: string;
    isbn: string;
    genres: Array<IGenre>;

    getId(): string;
}

class Book implements IBook {

    constructor(private id: string, public title: string, public summary: string, public isbn: string, public genres: Array<IGenre>) { }

    getId(): string {
        return this.id;
    }
}

export default Book;





