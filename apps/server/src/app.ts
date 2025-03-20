import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("I don't know why the hot reloading is not working...");
});

export default app;
