import express from "express";

// config and error handling
const requestLogger = (
  req: express.Request,
  _res: express.Response,
  next: any
) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (_req: express.Request, res: express.Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: any
) => {
  console.error(error.message);
  next(error);
};

export { requestLogger, unknownEndpoint, errorHandler };
