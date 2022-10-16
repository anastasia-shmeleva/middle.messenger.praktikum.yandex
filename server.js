import express from 'express';
import path from 'path';
const app = express();
const port = 3000;

app.use(express.static('dist'));

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});