import "dotenv/config";

// Server асаалттай байх ёстой
const BASE = `http://localhost:${process.env.PORT ?? 3000}`;

// Slide 13-ын 6 тест
const cases = [
  { method: "GET", path: "/books", expected: 200 },
  { method: "GET", path: "/books/1", expected: 200 },
  { method: "GET", path: "/books/search?q=node", expected: 200 },
  { method: "POST", path: "/books", body: { title: "Go" }, expected: 201 },
  { method: "POST", path: "/books", body: {}, expected: 400 },
  { method: "GET", path: "/unknown", expected: 404 },
];

let failed = 0;

for (const c of cases) {
  const res = await fetch(BASE + c.path, {
    method: c.method,
    headers: { "Content-Type": "application/json" },
    body: c.body ? JSON.stringify(c.body) : undefined,
  });

  const ok = res.status === c.expected;
  if (!ok) failed++;

  console.log(
    `${ok ? "OK  " : "FAIL"} ${c.method} ${c.path} -> ${res.status} (хүлээсэн: ${c.expected})`
  );
}

console.log(failed === 0 ? "\nБүх тест тэнцлээ" : `\n${failed} тест унав`);
process.exit(failed === 0 ? 0 : 1);