import { test } from "node:test";
import assert from "node:assert/strict";
import {
  books,
  findBookById,
  searchByTitle,
  countAvailable,
  getBooksFromDb,
  getBookOrThrow,
  addBook,
  updateBook,
  removeBook,
} from "../src/data/books.js";

test("findBookById: байгаа id", () => {
  assert.equal(findBookById(2).title, "Express");
});

test("findBookById: байхгүй id бол undefined", () => {
  assert.equal(findBookById(99), undefined);
});

test("searchByTitle: том/жижиг үсэг нөлөөлөхгүй", () => {
  assert.equal(searchByTitle("node").length, 1);
  assert.equal(searchByTitle("NODE").length, 1);
});

test("searchByTitle: олдохгүй бол хоосон array", () => {
  assert.deepEqual(searchByTitle("zzz"), []);
});

test("countAvailable: 2 ном байгаа", () => {
  assert.equal(countAvailable(), 2);
});

test("getBooksFromDb: Promise ном буцаана", async () => {
  const result = await getBooksFromDb();
  assert.equal(result.length, books.length);
});

test("getBookOrThrow: олдохгүй бол алдаа throw хийнэ", () => {
  assert.throws(() => getBookOrThrow(99), { message: "Book not found" });
});

// ===== Week 3: CRUD (тест хоорондоо дараалалтай, нэг өгөгдөл дээр ажиллана) =====

test("addBook: шинэ id, isAvailable=true", () => {
  const book = addBook({ title: "Docker", price: 100 });
  assert.equal(book.id, 4);
  assert.equal(book.isAvailable, true);
  assert.equal(books.length, 4);
});

test("updateBook: price өөрчилнө, id өөрчлөгдөхгүй", () => {
  const updated = updateBook(4, { id: 100, price: 99000 });
  assert.equal(updated.id, 4);
  assert.equal(updated.price, 99000);
});

test("updateBook: олдохгүй бол null", () => {
  assert.equal(updateBook(99, { price: 1 }), null);
});

test("removeBook: устгана, дахин устгавал false", () => {
  assert.equal(removeBook(4), true);
  assert.equal(removeBook(4), false);
  assert.equal(books.length, 3);
});