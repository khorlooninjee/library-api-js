// Хүсэлт бүрийг terminal дээр бүртгэнэ
export function logger(req, res, next) {
  const start = Date.now();

  // "finish": хариу илгээгдэж дууссны дараа ажиллана
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
  });

  next();
}