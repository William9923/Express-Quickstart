export interface IGenre {
    name: string;

    getId(): string;
}

class Genre implements IGenre {

    constructor(private id: string, public name: string) { }

    getId(): string {
        return this.id;
    }
}

export default Genre;