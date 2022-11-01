import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use('*', (req, res) => {
  res.sendFile('/index.html', { root: 'dist' });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
