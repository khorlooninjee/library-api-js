import { test } from "node:test";
import assert from "node:assert/strict";
import {
  books,
  findBookById,
  searchByTitle,
  countAvailable,
  getBooksFromDb,
  getBookOrThrow,
} from "../src/books.js";

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

test("getBooksFromDb: Promise 3 ном буцаана", async () => {
  const result = await getBooksFromDb();
  assert.equal(result.length, books.length);
});

test("getBookOrThrow: олдохгүй бол алдаа throw хийнэ", () => {
  assert.throws(() => getBookOrThrow(99), { message: "Book not found" });
});