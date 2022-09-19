const express = require("express");
const userRouter = require("./routes/users/Users.api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server run on port 3000");
  }
});
