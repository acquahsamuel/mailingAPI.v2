const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const sendEmail = require("./routes/sendEmail");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/emailAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/sendEmail", (req, res) => {
  const { email, subject, message } = req.body;

  sendEmail(email, subject, message, function (error, data) {
    if (error) {
      res.status(500).json({ message: "Ooop something happends" });
      console.log(error);
    } else {
      res.json({ message: "Email sent Successfully" });
      console.log(JSON.parse(data));
    }
  });
});

const port = 8080 || process.env.PORT;
app.listen(`${port}`, () => {
  console.log(`Server is runing on ${port}`);
});


