import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const loggerMiddleware = (req: express.Request, response: express.Response, next) => {
  console.log(`${req.method} ${req.path}`)
  next();
}

const port = 3000;
app.use(bodyParser.json())
app.use(loggerMiddleware)

app.get('/', (req, res) => {
  res.send('It works!');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
