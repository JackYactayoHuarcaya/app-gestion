import express from "express";
import route from "./route/route";
import cors from "cors";
import connectDB from "./model/db";
import dotenv from "dotenv";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    rol?: "user" | "admin";
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// cambiar url
const whiteList = ["http://localhost:5173"];

// midleware ......

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin) {
        if (whiteList.includes(origin) === true) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_SESSION || "secret-session",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
    },
  })
);
app.use(express.json());
connectDB();

app.use(route);

app.listen(port);
