import express from 'express';
import cors from 'cors';

import connection from './database';

import routes from './routes/index.routes';

connection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
