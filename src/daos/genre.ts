import { IGenre } from "../models/Genre";

export interface IGenreDao {
    getOne: (id: string) => Promise<IGenre | null>;
    get: () => Promise<IGenre[]>;
    create: (genre: IGenre) => Promise<void>;
    update: (genre: IGenre) => Promise<void>;
    delete: (id: string) => Promise<void>;
}