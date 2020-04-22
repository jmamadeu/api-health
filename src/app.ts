import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();

app.get('/diseases', (req, res) => {
  res.json([
    {
      id: uuid(),
      name: 'Corona Vírus',
      image_url: '',
      description: 'O vírus é mau.',
    },
  ]);
});

export default app;
