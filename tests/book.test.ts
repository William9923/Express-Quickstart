import Book from "../src/models/Book";
import Genre from "../src/models/Genre";

import { expect } from "chai";

import { MockBookDAO } from "../src/daos/mock/MockDAO.mock";

describe("book.js defined test", () => {

    afterEach( async () => {
        await new MockBookDAO().getDb().reset();
    });

    test("should be created", async () => {
        const DAO = new MockBookDAO();

        const newGenre = new Genre("4xx", "test-genre");
        const newBook = new Book("5xx", "Test Book", "Test Summary", "xx-xx-xx-xx", [newGenre]);
        expect(newBook).to.not.be.undefined;

        await DAO.create(newBook);
        const createdBook = await DAO.getOne(newBook.getId());

        expect(newBook).to.eql(createdBook, "Failed to be the same book");
    });

    test("should be updated",async () => {
        const DAO = new MockBookDAO();
        const id = "5f4e2c7c6b1ec201a0385174";
        let getOneBook = await DAO.getOne(id);

        if (getOneBook !== null) {
            getOneBook.title = "Test Book 3";
            getOneBook.isbn = "ISBN111113";
            getOneBook.summary = "Summary of test book 3";
            await DAO.update(getOneBook);
        }

        getOneBook = await DAO.getOne(id);

        expect(getOneBook!.title).to.equal("Test Book 3");
        expect(getOneBook!.summary).to.equal("Summary of test book 3");
        expect(getOneBook!.isbn).to.equal("ISBN111113");


    });
    test ("should be deleted", async () => {
        const DAO = new MockBookDAO();
        const id = "5f4e2c7c6b1ec201a0385174";
        const getOneBook = await DAO.getOne(id);
        await DAO.delete(getOneBook!.getId());

        const getOneBookRemoved = await DAO.getOne(id);
        expect(getOneBookRemoved).to.be.null;
    });
    test ("should query all books correctly", async () => {
        const DAO = new MockBookDAO();
        const getAllBook = await DAO.get();

        expect(getAllBook.length).to.eq(7);
    });

    test ("should query specific book correctly", async () => {
        const DAO = new MockBookDAO();
        const getOneBook = await DAO.getOne("5f4e2c7c6b1ec201a0385174");

        expect(getOneBook!.title).to.equal("Test Book 1", "Failed to get the title of the same book");

        expect(getOneBook!.summary).to.equal("Summary of test book 1");

        expect(getOneBook!.isbn).to.equal("ISBN111111", "Failed to get the isbn of the same book");
    });

    
});