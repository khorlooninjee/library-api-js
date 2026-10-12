import {
  users,
  findUserById,
  findByEmail,
  addUser,
  updateUser,
  removeUser,
  toSafeUser,
} from "../data/users.js";

// Бүх хариунаас password-ийг хасна (toSafeUser)

export function list(req, res) {
  res.json({ count: users.length, data: users.map(toSafeUser) });
}

export function getOne(req, res) {
  const user = findUserById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(toSafeUser(user));
}

export function create(req, res) {
  const { name, email, role, password } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  // Давхардсан email бол 409 Conflict
  if (findByEmail(email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = addUser({ name, email, role, password });
  res.status(201).json(toSafeUser(user));
}

export function update(req, res) {
  const id = Number(req.params.id);

  if (!findUserById(id)) {
    return res.status(404).json({ message: "User not found" });
  }

  // Email солих үед өөр хэрэглэгчийн email-тэй давхцаж болохгүй
  const email = req.body?.email;
  if (email) {
    const existing = findByEmail(email);
    if (existing && existing.id !== id) {
      return res.status(409).json({ message: "Email already exists" });
    }
  }

  const updated = updateUser(id, req.body);
  res.json(toSafeUser(updated));
}

export function remove(req, res) {
  const ok = removeUser(Number(req.params.id));

  if (!ok) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(204).send();
}