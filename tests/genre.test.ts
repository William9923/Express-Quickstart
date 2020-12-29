import Genre from "../src/models/Genre";

describe("genre.js defined test", () => {
    it("should be created", () => {
        const newGenre = new Genre("4xx", "test-genre");
        expect(newGenre).toBeDefined();
    });
});