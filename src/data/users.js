// Хэрэглэгчийн өгөгдөл ба функцууд

export const users = [
  { id: 1, name: "Bat", email: "bat@example.com", role: "admin", password: "x1" },
  { id: 2, name: "Dorj", email: "dorj@example.com", role: "user", password: "x2" },
  { id: 3, name: "Sara", email: "sara@example.com", role: "user", password: "x3" },
  { id: 4, name: "Oyuna", email: "oyuna@example.com", role: "admin", password: "x4" },
];

let nextId = 5;

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

// Email-ийг жижиг үсэг болгож, хоосон зайг тайруулж харьцуулна
export function findByEmail(email) {
  const key = String(email ?? "").trim().toLowerCase();
  return users.find((user) => user.email === key);
}

export function countAdmins() {
  return users.filter((user) => user.role === "admin").length;
}

// Хариунаас password-ийг rest operator-оор хасна
export function toSafeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

export function addUser(input) {
  const user = {
    ...input,
    id: nextId++,
    role: input.role ?? "user",
    email: String(input.email).trim().toLowerCase(),
  };
  users.push(user);
  return user;
}

export function updateUser(id, changes) {
  const user = findUserById(id);
  if (!user) return null;

  const { id: _ignored, ...safeChanges } = changes ?? {};

  if (safeChanges.email) {
    safeChanges.email = String(safeChanges.email).trim().toLowerCase();
  }

  Object.assign(user, safeChanges);
  return user;
}

export function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}