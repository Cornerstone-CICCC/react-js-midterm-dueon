import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import reviewRouter from "./routes/review.routes";
import cartRouter from "./routes/cart.routes";

import paymentRouter from "./routes/payment.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
  throw new Error("Missing cookie keys!");
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_PRIMARY_KEY, process.env.COOKIE_SECONDARY_KEY],
    maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax",
  })
);

app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/cart", cartRouter);
app.use("/payments", paymentRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is running!");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const MONGO_URI = process.env.DATABASE_URI!;
mongoose
  .connect(MONGO_URI, { dbName: "midtermproject" })
  .then(() => {
    console.log("Connected to MongoDB database");

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
