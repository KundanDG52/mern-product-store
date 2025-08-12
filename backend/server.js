import express from "express";

const app = express();

// GET
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(5000, () => {
  console.log("Server started on port http://localhost:5000");
});
