import express from "express";
import bodyParser from "body-parser";
import eventRoutes from "./events/routes";

const app = express();

const loggerMiddleware = (
  req: express.Request,
  response: express.Response,
  next
) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

function errorHandler(err, _req, res, _next) {
  res.status(400).send(JSON.parse(err));
}

const port = 3001;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(loggerMiddleware);

app.use("/events", eventRoutes);

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
