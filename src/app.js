// .env файлыг ХАМГИЙН ЭХЭНД ачаална
import "dotenv/config";

import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

// PORT нь .env-ээс, байхгүй бол 3000
const PORT = Number(process.env.PORT ?? 3000);

// 1. Бэлтгэл: parser, logger
app.use(express.json());
app.use(logger);

// 2. Ажил: route-ууд
app.use("/books", booksRouter);
app.use("/users", usersRouter);

// 3. Цэвэрлэгээ: хамгийн доор
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} дээр ажиллаж байна`);
});