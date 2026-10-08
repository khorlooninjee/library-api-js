// Хэрэглэгчийн өгөгдөл ба функцууд

export const users = [
  { id: 1, name: "Bat", email: "bat@example.com", role: "admin", password: "x1" },
  { id: 2, name: "Dorj", email: "dorj@example.com", role: "user", password: "x2" },
  { id: 3, name: "Sara", email: "sara@example.com", role: "user", password: "x3" },
  { id: 4, name: "Oyuna", email: "oyuna@example.com", role: "admin", password: "x4" },
];

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function findByEmail(email) {
  return users.find((u) => u.email === String(email).trim().toLowerCase());
}

export function countAdmins() {
  return users.filter((u) => u.role === "admin").length;
}

// Хариунаас password-ийг rest operator-оор хасна
export function toSafeUser(user) {
  const { password, ...safe } = user;
  return safe;
}