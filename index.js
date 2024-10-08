const express = require("express");
const mongoose = require("mongoose");

const DB =
  "mongodb+srv://hassanalihassan1203:ifeXeIZEHBjJgXJI@blog-project.lagozgm.mongodb.net/todos-project";
const PORT = process.PORT || 8080;
const app = express();
app.use(express.json());

const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.json({
    wellecome: "Hello it is working ❤️❤️",
    auther: {
      name: "Hassan ali ",
      email: "hassanalihassan1203@gmail.com",
      protfilo_link: "https://hassanali199912.github.io/My-Second-Portfolio/",
    },
  });
});

mongoose
  .connect(DB)
  .then((req) => {
    app.listen(PORT, () => {
      console.log("Server is running on : http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
