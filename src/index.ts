import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import 'reflect-metadata';

import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

const PORT = 8080;
app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});
