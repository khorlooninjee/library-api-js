import express from "express";
import {
  findBookById,
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow,
  countAvailable,
} from "./books.js"; // ESM-д ".js" өргөтгөл заавал бичнэ
import { users, findUserById, toSafeUser } from "./users.js";

// 1. Эхлээд app үүсгэнэ (route-оос ӨМНӨ)
const app = express();

// ===== Books =====

// GET /books болон GET /books?q=node
app.get("/books", async (req, res) => {
  const q = req.query.q;

  // q байвал хайлт хийнэ
  if (q) {
    return res.json(searchByTitle(q));
  }

  // async/await: Promise-ийг хүлээж байж хариу өгнө
  const books = await getBooksFromDb();
  res.json(books);
});

// GET /books/stats (/books/:id-аас ӨМНӨ бичнэ)
app.get("/books/stats", (req, res) => {
  res.json({ available: countAvailable() });
});

// GET /books/:id
app.get("/books/:id", (req, res) => {
  // req.params.id нь string тул Number() хийнэ
  const id = Number(req.params.id);
  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// throw + try/catch жишээ
app.get("/books-strict/:id", (req, res) => {
  try {
    const book = getBookOrThrow(Number(req.params.id));
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ===== Users =====

// GET /users (password-ийг хасаж буцаана)
app.get("/users", (req, res) => {
  res.json(users.map(toSafeUser));
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const user = findUserById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(toSafeUser(user));
});

// ===== Server асаах (хамгийн СҮҮЛД) =====

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server http://localhost:${port} дээр ажиллаж байна`);
});