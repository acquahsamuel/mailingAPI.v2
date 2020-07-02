const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const config = require("dotenv").config();
const sendEmail = require("./routes/sendEmail");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

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

/**
 *@TODO Logs error after Email is sent
 Investigate ERROR [ Cannot set headers after they are sent to the client] 
 */
app.post("/sendEmail", (req, res) => {
  const { from, to, subject, message } = req.body;
  console.log(from + " " + to + " " + subject + " " + message);
  //Change domain to To
  sendEmail(from, to, subject, message, function (error, data) {
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
