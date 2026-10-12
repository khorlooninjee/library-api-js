// Номын өгөгдөл ба өгөгдөлтэй ажиллах функцууд (өгөгдөл RAM-д хадгалагдана)

export const books = [
  { id: 1, title: "Node", author: "Bat", price: 45000, isAvailable: true },
  { id: 2, title: "Express", author: "Dorj", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", author: "Sara", price: 61000, isAvailable: false },
];

// Дараагийн шинэ номын id
let nextId = 4;

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function searchByTitle(keyword) {
  const key = String(keyword ?? "").toLowerCase();
  return books.filter((book) => book.title.toLowerCase().includes(key));
}

export function countAvailable() {
  return books.filter((book) => book.isAvailable).length;
}

export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 500);
  });
}

export function getBookOrThrow(id) {
  const book = findBookById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}

// POST: шинэ ном нэмэх
export function addBook(input) {
  // id-г хамгийн сүүлд тавина, ингэснээр гаднаас id дарж бичиж чадахгүй
  const book = { isAvailable: true, ...input, id: nextId++ };
  books.push(book);
  return book;
}

// PATCH: ном засах. Олдохгүй бол null
export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;

  // id өөрчлөгдөхөөс хамгаална (rest operator-оор хасна)
  const { id: _ignored, ...safeChanges } = changes ?? {};

  Object.assign(book, safeChanges);
  return book;
}

// DELETE: ном устгах. Олдохгүй бол false
export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return false;

  books.splice(index, 1); // array-аас 1 элемент хасна
  return true;
}