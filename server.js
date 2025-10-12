import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 7000;

//parse the request body
app.use(express.json());

app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "Server running",
  });
});

//mongoose database connection mongodb://localhost:27017/auth-db
mongoose.connect("mongodb://localhost:27017/Finance").then(() => {
  console.log("connected to mongodb://localhost:27017/Finance");
  app.listen(PORT, (error) => {
    if (error) {
      console.log("Error while starting");
    } else {
      console.log(`Server started at port ${PORT}`);
    }
  });
});
