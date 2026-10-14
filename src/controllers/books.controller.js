import {
  books,
  findBookById,
  searchByTitle,
  countAvailable,
  addBook,
  updateBook,
  removeBook,
} from "../data/books.js";

// GET /books болон GET /books?q=node
export function list(req, res) {
  const { q } = req.query;
  const data = q ? searchByTitle(q) : books;

  res.json({ count: data.length, data });
}

// GET /books/stats
export function stats(req, res) {
  res.json({ available: countAvailable() });
}

// GET /books/:id
export function getOne(req, res) {
  const book = findBookById(Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
}

// POST /books
export function create(req, res) {
  // req.body байхгүй байж болох тул ?? {} хийнэ
  const { title, author, price } = req.body ?? {};

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  if (price !== undefined && typeof price !== "number") {
    return res.status(400).json({ message: "price must be a number" });
  }

  const book = addBook({ title, author, price });
  res.status(201).json(book);
}

// PATCH /books/:id
export function update(req, res) {
  const updated = updateBook(Number(req.params.id), req.body);

  if (!updated) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(updated);
}

// DELETE /books/:id
export function remove(req, res) {
  const ok = removeBook(Number(req.params.id));

  if (!ok) {
    return res.status(404).json({ message: "Book not found" });
  }

  // 204: body байхгүй
  res.status(204).send();
}
// GET /books/search?q=node
export function search(req, res) {
  const { q = "" } = req.query; // q байхгүй бол хоосон текст
  const data = searchByTitle(q);

  res.json({ count: data.length, data });
}