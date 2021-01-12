import mongoose, { Schema, Document } from "mongoose";
import Genre, { IGenre } from "../../models/Genre";
import { IGenreDao } from "../genre";

export interface IGenreMongo extends Document, IGenre { }

const GenreSchema: Schema = new Schema({
    name: { type: String, required: true }
});

GenreSchema
    .virtual("url")
    .get(function (this: IGenreMongo) {
        return "/genres/" + this._id;
    });

GenreSchema.loadClass(Genre);

const model = mongoose.model<IGenreMongo>("Genre", GenreSchema);

export class MongoGenreDAO implements IGenreDao {
    async getOne(id: string): Promise<IGenre | null> {
        const result: IGenreMongo = await model.findById(id).exec();
        return new Genre(result.id, result.name);
    }

    async get(): Promise<IGenre[]> {
        const results: IGenreMongo[] = await model.find({});
        return results.map(result => new Genre(result.id, result.name));
    }

    async create(genre: IGenre): Promise<void> {
        await model.create({ _id: genre.getId(), name: genre.name });
    }
    async update(genre: IGenre): Promise<void> {
        await model.findByIdAndUpdate(genre.getId(), { name: genre.name }).exec();
    }
    async delete(id: string): Promise<void> {
        await model.findByIdAndDelete(id).exec();
    }
}