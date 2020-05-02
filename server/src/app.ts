import dotEnv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

dotEnv.config();

import eventRoutes from "./events/routes";

export const app = express();

const loggerMiddleware = (
  req: express.Request,
  _response: express.Response,
  next
) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

function errorHandler(err, _req, res, _next) {
  try {
    const jsonError = JSON.parse(err);
    res.status(400).send(jsonError);
  } catch {
    res.status(500).send(err);
  }
}

const port = 3001;
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(loggerMiddleware);

app.use("/events", eventRoutes);

app.use(errorHandler);

export const server = app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
