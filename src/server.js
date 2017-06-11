import express from 'express';
import cors from 'cors';
import config from './config';
import exchangeRate from './routes/fx-route';
import { expressLogger } from './logger';

const { port } = config;

const app = express();

app.use(cors());

app.use(expressLogger);

app.use('/exchange-rates', exchangeRate);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
