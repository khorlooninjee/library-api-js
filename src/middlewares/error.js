// Ямар ч route таарахгүй үед
export function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.url,
  });
}

// Дөрвөн параметртэй байх ёстой: Express үүгээр error handler гэж танина
export function errorHandler(error, req, res, next) {
  // Buruu JSON илгээсэн бол 400
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  // Бодит алдааг зөвхөн server дээр бүртгэнэ, client-д stack өгөхгүй
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}