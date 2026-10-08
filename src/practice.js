// ===== Дасгал 1: Object =====
const book = {
  id: 1,
  title: "Node.js Basics",
  author: "Bat",
  price: 45000,
  isAvailable: true,
};

console.log(book.title); // цэгээр
console.log(book["title"]); // хаалтаар
console.log(book.isbn); // undefined (байхгүй field)
book.price = 50000; // const object-ийн field өөрчилж болно
console.log(book.price);

// ===== Дасгал 2: Array ба map =====
const books = [
  { id: 1, title: "Node", price: 45000, isAvailable: true },
  { id: 2, title: "Express", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", price: 61000, isAvailable: false },
  { id: 4, title: "React", price: 38000, isAvailable: true },
];

const titles = books.map((b) => b.title);
const labels = books.map((b) => `${b.title} — ${b.price}`);

console.log(titles);
console.log(labels);
console.log(books.length);

// ===== Дасгал 3: filter ба find =====
const cheap = books.filter((b) => b.price < 50000);
const available = books.filter((b) => b.isAvailable);
const book3 = books.find((b) => b.id === 3);
const book99 = books.find((b) => b.id === 99);

console.log(cheap);
console.log(available);
console.log(book3);
console.log(book99 ?? "not found"); // id=99 бол undefined

// ===== Дасгал 4: 5 function =====
function sum(a, b) {
  return a + b;
}

function isExpensive(b) {
  return b.price > 50000;
}

function getTitles(list) {
  return list.map((b) => b.title);
}

const countAvailable = (list) => list.filter((b) => b.isAvailable).length;

const formatPrice = (price) => `${price}₮`;

console.log(sum(2, 3));
console.log(isExpensive(books[1]));
console.log(getTitles(books));
console.log(countAvailable(books));
console.log(formatPrice(45000));