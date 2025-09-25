import express from 'express';

const app = express();
app.use(express.json());

app.use('/api/hello-world', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

export default app;
