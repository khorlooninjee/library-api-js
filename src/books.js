// Номын өгөгдөл ба номтой холбоотой функцууд

export const books = [
  { id: 1, title: "Node", author: "Bat", price: 45000, isAvailable: true },
  { id: 2, title: "Express", author: "Dorj", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", author: "Sara", price: 61000, isAvailable: false },
];

// id-аар ном хайх. Олдохгүй бол undefined буцаана
export function findBookById(id) {
  return books.find((book) => book.id === id);
}

// Гарчгаар хайх. Том/жижиг үсэг нөлөөлөхгүй
export function searchByTitle(keyword) {
  const key = String(keyword ?? "").toLowerCase();
  return books.filter((book) => book.title.toLowerCase().includes(key));
}

// Байгаа номын тоо
export function countAvailable() {
  return books.filter((book) => book.isAvailable).length;
}

// Database-ийг дүрсэлсэн Promise (500ms хүлээнэ)
export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500);
  });
}

// Ном олдохгүй бол алдаа throw хийнэ
export function getBookOrThrow(id) {
  const book = findBookById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}