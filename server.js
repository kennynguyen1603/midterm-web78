import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rootRouterV1 from "./api/routers/index.js";
import session from "express-session";
dotenv.config();
mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mySessionSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/api/v1", rootRouterV1);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
