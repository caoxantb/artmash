import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import cors from "cors";
import cookieParser from 'cookie-parser';

//middlewares
import { MONGODB_URI } from "./utils/config";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware";

//routers
import { usersRouter, galleriesRouter, filmsRouter } from "./routes";

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((er) => {
    console.error("error connecting to MongoDB", er.message);
  });

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true}));
app.use(express.json());
app.use(requestLogger);


app.use("/api/users", usersRouter);
app.use("/api/galleries", galleriesRouter);
app.use("/api/films", filmsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
